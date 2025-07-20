import React from "react";
import { Modal } from "react-bootstrap";
import RequestForm from "./RequestForm";
import PropTypes from "prop-types";

function RequestPayment(props) {
  const { show, handleClose, title } = props;
  return (
    <Modal
      show={show}
      onHide={()=>handleClose()}
      className="paymentrequest-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 pb-0 overflow-y-auto">
        <RequestForm handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}

// props validation
RequestPayment.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default RequestPayment;
