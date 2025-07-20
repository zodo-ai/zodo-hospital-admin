import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

function ServiceModal(props) {
  const { show, handleClose, title, children } = props;
  return (
    <Modal
      show={show}
      onHide={() => handleClose()}
      className="paymentrequest-custom-modal"
      style={{ maxWidth: "none" }}
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title >{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="pt-0 pb-0 overflow-y-auto">
        {children}
      </Modal.Body>
    </Modal>
  );
}

// props validation
ServiceModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ServiceModal;
