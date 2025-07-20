import React from "react";
import { Modal } from "react-bootstrap";
import CreateStaff from "../AddStaff/CreateStaff";
import PropTypes from "prop-types";

function CreateStaffModal(props) {
  const { show, setShow, title, userType } = props;
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
        <CreateStaff handleClose={handleClose} userType={userType}/>
      </Modal.Body>
    </Modal>
  );
}

CreateStaffModal.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  title: PropTypes.node,
  userType: PropTypes.node,
};

export default CreateStaffModal;
