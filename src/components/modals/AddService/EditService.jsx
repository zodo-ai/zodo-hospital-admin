import React from "react";
import { Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import EditServiceForm from "./EditServiceForm";

function EditService(props) {
  const { show, setShow, selectedService } = props;
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdropClassName="hospital-modal-backdrop"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Add Service</Modal.Title>
        </Modal.Header>
        <Modal.Body className="border-0">
          <EditServiceForm handleClose={handleClose} selectedService={selectedService}/>
        </Modal.Body>
      </Modal>
    </div>
  );
}

// props validation
EditService.propTypes = {
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired,
  selectedService: PropTypes.string.isRequired
};

export default EditService;
