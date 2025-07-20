import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

function CenteredModal(props) {
  const { children, show, handleClose, title } = props;

  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        {children}
        {/* <DepartmentForm handleClose={handleClose} /> */}
      </Modal.Body>
    </Modal>
  );
}

CenteredModal.propTypes = {
  children: PropTypes.node,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
};

export default CenteredModal;
