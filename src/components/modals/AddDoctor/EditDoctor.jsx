import React from "react";
import { Modal } from "react-bootstrap";
import DoctorTimeslot from "./DoctorTimeslot";
import EditOverview from "./EditOverview";
import PropTypes from "prop-types";
import ModalTabs from "../../tabs/ModalTabs";

function EditDoctor(props) {
  const { show, setShow, title, selectedDoctor } = props;
  const handleClose = () => {
    setShow(false);
  };
  const tabData = [
    {
      id: "edit_dr_overview",
      title: "Overview",
      content: <EditOverview selectedDoctor={selectedDoctor} handleClose={handleClose}/>,
    },
    { id: "dr_timeslot", title: "Time Slot", content: <DoctorTimeslot selectedDoctor={selectedDoctor}/> },
  ];

  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="doctor-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 pb-0 overflow-y-auto">
        <ModalTabs tabData={tabData} />
      </Modal.Body>
    </Modal>
  );
}

EditDoctor.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  title: PropTypes.node,
  selectedDoctor: PropTypes.node,
};

export default EditDoctor;
