import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";

function ConfirmModal(props) {
  const { show, setShow, title, handleClick, isLoading } = props;
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdropClassName="hospital-modal-backdrop"
    >
      <Modal.Header closeButton className="border-0">
        <Modal.Title>{title} ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        <div className="form-group">
          <label className="col-form-label col-md-4">Reason For Approval</label>
          <div className="">
            <textarea
              rows={5}
              cols={5}
              className="form-control modal-input"
              placeholder="Write Here.."
              defaultValue={""}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="border-0">
        <button
          to="#"
          // data-bs-toggle="modal"
          // data-bs-target="#delete_invoices_details"
          className="hospital-draft-btn text-primary modal-btn"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          to="#"
          // data-bs-toggle="modal"
          // data-bs-target="#save_invocies_details"
          className="hospital-add-btn ms-1 text-white modal-btn border-0"
          onClick={() => handleClick()}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span className="ps-2">Yes</span>
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  setShow: PropTypes.func,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

export default ConfirmModal;
