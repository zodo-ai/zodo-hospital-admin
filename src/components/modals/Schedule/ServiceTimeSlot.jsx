import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { formatTime } from "../../configs/formatTime";

function ServiceTimeSlot({ handleTime }) {
  const timeSlots = [
    { startTime: "08:00:00", endTime: "12:00:00" },
    { startTime: "14:00:00", endTime: "18:00:00" },
  ];
  return (
    <div>
      <div className="d-flex flex-wrap">
        {timeSlots?.map((item) => (
          <div key={`timeslot${item.startTime}`}>
            <Button
              className="time-btn"
              onClick={() => handleTime(item.startTime)}
            >
              {formatTime(item.startTime)} - {formatTime(item.endTime)}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

ServiceTimeSlot.propTypes = {
  handleTime: PropTypes.func,
};

export default ServiceTimeSlot;
