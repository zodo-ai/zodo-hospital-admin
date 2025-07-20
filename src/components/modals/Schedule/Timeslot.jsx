import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { formatTime } from "../../configs/formatTime";
import ComponentLoader from "../../loaders/ComponentLoader";

function Timeslot({ slots, handelTimeslot, loading }) {
  const filteredSlots = slots.filter((slot) => slot.isAvailable);
  return (
    <div className="mt-3">
      {!loading ? (
        <div>
          {filteredSlots?.length > 0 ? (
            <div className="d-flex flex-wrap">
              {filteredSlots?.map((item) => (
                <div key={`fasttagMorningSlot${item.startTime}`}>
                  <Button
                    className="time-btn"
                    onClick={() => handelTimeslot(item.startTime)}
                  >
                    {formatTime(item.startTime)} - {formatTime(item.endTime)}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="timeslot-container">
              <p>No time slots available</p>
            </div>
          )}
        </div>
      ) : (
        <div className="timeslot-container">
          <ComponentLoader />
        </div>
      )}
    </div>
  );
}

// props validation
Timeslot.propTypes = {
  slots: PropTypes.isRequired,
  handelTimeslot: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default Timeslot;
