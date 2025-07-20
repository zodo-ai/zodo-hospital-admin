import { Row, Col, Form } from "react-bootstrap";
import { useWeeks } from "../../../../hooks/timeslot/useWeeks";
import PropTypes from "prop-types";
import { useAddAvailability } from "../../../../hooks/timeslot/useAddAvailability";
import { useGetWeekAvailabilities } from "../../../../hooks/timeslot/useGetWeekAvailabilities";
import useRemoveAvailability from "../../../../hooks/timeslot/useRemoveAvailability";
import { useEffect, useState } from "react";
import { useUpdateAvailability } from "../../../../hooks/timeslot/useUpdateAvailability";
import { debounce } from "lodash";

function Availability({ selectedDoctor }) {
  const { mutateAsync } = useAddAvailability();
  const { mutate: updateAvailability } = useUpdateAvailability();
  const { mutate: deleteAvailability } = useRemoveAvailability();
  const [slotTimes, setSlotTimes] = useState({});

  const { data: weeks } = useWeeks();
  if (!weeks) return <div>Loading weeks...</div>;

  const week_ids = weeks.map((week) => week.id);
  const consultationDuration = selectedDoctor?.consultation_duration;
  const generateTimeOptions = () => {
    const times = [];
    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < 60; m += consultationDuration) {
        times.push(
          `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`
        );
      }
    }
    return times;
  };

  const times = generateTimeOptions();
  const { data: availability } = useGetWeekAvailabilities(
    selectedDoctor?.id,
    week_ids
  );

  const formatTime = (time) => time?.slice(0, 5);

  const addMinutes = (time, mins) => {
    const [h, m] = time.split(":").map(Number);
    const date = new Date();
    date.setHours(h);
    date.setMinutes(m + mins);
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!availability || Object.keys(slotTimes).length > 0) return;

    const initialSlotTimes = {};
    availability.forEach((week) => {
      const slots = week?.[0]?.availabilities || [];
      slots.forEach((slot) => {
        const id = slot.id;
        initialSlotTimes[id] = {
          start: formatTime(slot.startTime),
          end: formatTime(slot.endTime),
        };
      });
    });

    setSlotTimes(initialSlotTimes);
  }, [availability]);
  const sortedAsc = (data) =>
    data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const handleAddSlot = async (day) => {
    const weekId = day.id;
    const weekIndex = week_ids.findIndex((id) => id === weekId);
    const currentWeek = availability?.[weekIndex];
    if (!currentWeek?.[0]) return;
    const availabilities = currentWeek[0].availabilities || [];
    const last = availabilities[availabilities.length - 1];
    const defaultStart = last?.endTime ? formatTime(last.endTime) : "09:00";
    const defaultEnd = addMinutes(defaultStart, consultationDuration);

    const slotData = {
      doctor_id: selectedDoctor?.id,
      type: "week",
      week_id: weekId,
      startTime: defaultStart,
      endTime: defaultEnd,
      not_available: false,
    };
    try {
      await mutateAsync(slotData);
    } catch (err) {
      console.error("Error adding slot", err);
    }
  };
  const handleRemoveSlot = (id) => deleteAvailability(id);
  const debouncedUpdate = debounce((slotId, data) => {
    updateAvailability({ id: slotId, data });
  }, 500);

  const handleChange = (field, value, slotId) => {
    setSlotTimes((prev) => {
      const updated = {
        ...prev[slotId],
        [field]: value,
      };
      debouncedUpdate(slotId, {
        startTime: updated.start,
        endTime: updated.end,
      });
      return {
        ...prev,
        [slotId]: updated,
      };
    });
  };

  const renderStartForm = (item, day, index, slotIndex, slotId) => {
    const value = slotTimes[slotId]?.start || formatTime(item.startTime);

    // Find the previous slot's end time
    const prevSlot = availability[index]?.[0]?.availabilities?.[slotIndex - 1];
    const minStartTime = prevSlot ? formatTime(prevSlot.endTime) : null;

    // Filter options if not the first slot
    const options = minStartTime
      ? times.filter((t) => t >= minStartTime)
      : times; // show all for first slot

    return (
      <Form.Select
        value={value}
        onChange={(e) => handleChange("start", e.target.value, slotId)}
        disabled={selectedDoctor?.auto_booking_enabled}
      >
        {options.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </Form.Select>
    );
  };

  const renderEndForm = (item, day, slotId) => {
    const start = slotTimes[slotId]?.start || formatTime(item.startTime);
    const value = slotTimes[slotId]?.end || formatTime(item.endTime);
    const options = times.filter((t) => t > start);

    return (
      <Form.Select
        value={value}
        onChange={(e) => handleChange("end", e.target.value, slotId)}
        disabled={selectedDoctor?.auto_booking_enabled}
      >
        {options.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </Form.Select>
    );
  };

  return (
    <div className="container my-2">
      {weeks.map((day, index) => (
        <div key={day.id} className="mb-4 border-bottom pb-3 d-flex">
          <div style={{ width: "10%" }}>
            <strong>{day.name}</strong>
          </div>
          <div className="w-75">
            {sortedAsc(availability[index]?.[0]?.availabilities || [])?.map(
              (item, slotIndex) => (
                <Row key={item.id} className="align-items-center mb-2">
                  <Col xs={3}>
                    {renderStartForm(item, day, index, slotIndex, item.id)}
                  </Col>
                  <Col xs={3}>{renderEndForm(item, day, item.id)}</Col>
                  <Col xs={1}>
                    <button
                      className="btn-outline-danger rounded-circle"
                      style={{ width: "30px", height: "30px" }}
                      onClick={() => handleRemoveSlot(item.id)}
                      title="Remove Slot"
                      disabled={selectedDoctor?.auto_booking_enabled}
                    >
                      −
                    </button>
                  </Col>
                </Row>
              )
            )}
            <button
              className="btn-outline-primary rounded-circle"
              style={{ width: "30px", height: "30px" }}
              onClick={() => handleAddSlot(day)}
              title="Add Slot"
              disabled={selectedDoctor?.auto_booking_enabled}
            >
              +
            </button>
          </div>
        </div>
      ))}
      {/* <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-primary" className="ps-5 pe-5">
          Back
        </Button>
        <Button variant="primary" className="ps-5 pe-5">
          Edit Now
        </Button>
      </div> */}
    </div>
  );
}

Availability.propTypes = {
  selectedDoctor: PropTypes.object,
};

export default Availability;
