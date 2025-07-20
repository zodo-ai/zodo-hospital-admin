import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

function ConfirmDelete(props) {
  const { show, setShow, title, handleDelete, isLoading } = props;
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
        <Modal.Title>Are you sure you want to delete the {title} ?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        <div className="form-group">
          <label className="col-form-label col-md-4">Reason For Deleting</label>
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
          onClick={() => handleDelete()}
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

ConfirmDelete.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  title: PropTypes.node,
  handleDelete: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
};

export default ConfirmDelete;
