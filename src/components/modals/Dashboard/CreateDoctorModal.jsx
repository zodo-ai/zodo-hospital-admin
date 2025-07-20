import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import CreateDoctorForm from "../../Dashboard/CreateDoctorForm";

function CreateDoctorModal(props) {
  const { show, setShow, title } = props;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      className="create-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 pb-0">
        <CreateDoctorForm handleClose={handleClose}/>
      </Modal.Body>
    </Modal>
  );
}

CreateDoctorModal.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  title: PropTypes.node,
};

export default CreateDoctorModal;
