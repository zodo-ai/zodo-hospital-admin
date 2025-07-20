import PropTypes from 'prop-types';
import React from 'react'
import { Modal } from 'react-bootstrap'

function ToggleDisable(props) {
    const { show, setShow, setdisable, disable, title } = props;
    const handleDisable = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setShow(false);
      setdisable(!disable);
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
          Are you sure you want to {!disable ? "Enable" : "Disable"} the {title}
          ?
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
      <Modal.Footer className="border-0">
        <button
          to="#"
          data-bs-toggle="modal"
          data-bs-target="#delete_invoices_details"
          className="btn hospital-draft-btn text-primary"
          onClick={() => setShow(false)}
        >
          Cancel
        </button>
        <button
          to="#"
          onClick={handleDisable}
          className="btn hospital-add-btn ms-1 text-white"
        >
          Yes, {!disable ? "Enable" : "Disable"}
        </button>
      </Modal.Footer>
    </Modal>
  )
}


ToggleDisable.propTypes = {
    show: PropTypes.node,
    setShow: PropTypes.node,
    setdisable: PropTypes.node,
    disable: PropTypes.node,
    title: PropTypes.node,
  };
export default ToggleDisable