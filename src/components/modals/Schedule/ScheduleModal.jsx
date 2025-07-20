import PropTypes from "prop-types";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ScheduleForm from "./ScheduleForm";
import { useAssignAppointments } from "../../../hooks/appointments/useAssignAppointment";
import ServiceScheduleForm from "./ServiceScheduleForm";

function ScheduleModal(props) {
  const { show, setShow, requestDetails} = props;
  const { mutate } = useAssignAppointments();
  const [timeSlot, setTimeslot] = useState(null);
  const handleClose = () => {
    setShow(false);
  };
  const handelAssignment = async () => {
    const data = {
      timeSlot: timeSlot,
    };
    await mutate(
      { id: requestDetails?.id, data: data },
      {
        onSuccess: () => {
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      }
    );
  };

  const handleTime = (time) => {
    setTimeslot(time);
    
  };

  return (
    <Modal
      show={show}
      onHide={()=>handleClose()}
      className="doctor-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <div>
            <div className="d-flex justify-content-center ps-5"></div>
            <div className="d-flex align-items-center">
              <div className="schedule-modal">
                <div className="d-flex">
                  <h5>{requestDetails?.user_details?.name || requestDetails?.user?.first_name}</h5>
                  
                </div>
                <small>
                  {requestDetails?.user_details?.age || requestDetails?.user?.age}
                  {" yrs "}
                  {requestDetails?.user_details?.gender || requestDetails?.user?.gender}{" "}
                  <span className="ms-1">{ requestDetails?.user_details?.phone_number || requestDetails?.user?.phone}</span>
                </small>
              </div>
            </div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="pt-0 pb-0"> 
        {requestDetails?.type === "consultation" && <ScheduleForm requestDetails={requestDetails} handleTime={handleTime} />}
        {requestDetails?.type === "service" && <ServiceScheduleForm requestDetails={requestDetails} handleTime={handleTime} />}
        
      </Modal.Body>

      <Modal.Footer>
        <div className="d-flex justify-content-end ps-3 pe-3 pb-5 pt-5">
          <Button
            variant="primary"
            onClick={handelAssignment}
            className="ps-5 pe-5"
          >
            Assign Now
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

ScheduleModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  requestDetails: PropTypes.object,
};

export default ScheduleModal;
