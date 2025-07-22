import PropTypes from "prop-types";
import React from "react";
import { Modal } from "react-bootstrap";

function ToggleModal(props) {
  const { show, setShow, setdisable, disable, handleDisable, isLoading, title } = props;
  const handleDisableClick = () => {
    // setShow(false);
    setdisable(!disable);
    handleDisable();
  };
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
        <Modal.Title>
          Are you sure you want to {!disable ? "Enable" : "Disable"} the{" "}
          {title} ?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-0">
        <div className="form-group">
          <label className="col-form-label col-md-4">
            Reason For {!disable ? "Enabl" : "Disabl"}ing
          </label>
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
      {/* <Modal.Footer className="border-0"> */}
      <div className="form-group d-flex justify-content-end pt-3 pe-2">
        <button
          to="#"
          //   data-bs-toggle="modal"
          //   data-bs-target="#delete_invoices_details"
          className="hospital-draft-btn text-primary pt-1 pb-1 ps-3 pe-3 rounded"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          to="#"
          //   data-bs-toggle="modal"
          //   data-bs-target="#save_invocies_details"
          className="hospital-add-btn ms-1 text-white border-0 pt-1 pb-1 ps-3 pe-3 rounded"
          onClick={() => handleDisableClick()}
        >
          {isLoading && (
            <span
              className="spinner-border spinner-border-sm"
              aria-hidden="true"
            ></span>
          )}
          <span className="ps-2">Yes,{!disable ? " Enable" : " Disable"}</span>
        </button>
      </div>
      {/* </Modal.Footer> */}
    </Modal>
  );
}

ToggleModal.propTypes = {
  show: PropTypes.node,
  setShow: PropTypes.node,
  setdisable: PropTypes.node,
  disable: PropTypes.node,
  handleDisable: PropTypes.func,
  isLoading: PropTypes.bool,
  title: PropTypes.string
};

export default ToggleModal;
