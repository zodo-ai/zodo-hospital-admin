import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";
import DepartmentForm from "../../Dashboard/DepartmentForm";

function DepartmentMoadl(props) {
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
        {/* <TransparentTabs tabData={tabData} /> */}
        {/* <CreateStaff /> */}
        <DepartmentForm handleClose={handleClose}/>
        
      </Modal.Body>
    </Modal>
  );
}

DepartmentMoadl.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  title: PropTypes.node,
};

export default DepartmentMoadl;
