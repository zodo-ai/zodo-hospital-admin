import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

function SideModal(props) {
    const {children, show, handleClose,title} = props;
  return (
    <Modal
      show={show}
      onHide={()=>handleClose()}
      className="doctor-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 pb-0 overflow-y-auto">
        {/* <CreateStaff handleClose={handleClose} /> */}
        {children}
      </Modal.Body>
    </Modal>
  );
}

SideModal.propTypes ={
    children: PropTypes.node,
    show: PropTypes.bool,
    handleClose: PropTypes.func,
    title: PropTypes.string
}

export default SideModal;
