import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import TextArea from "../../Inputfields/TextArea";
import PropTypes from "prop-types";
import { useAddDepartment } from "../../../hooks/departments/useAddDepartment";
import { useAuth } from "../../../hooks/useAuth";

function DepartmentForm(props) {
  const { handleClose } = props;
  const methods = useForm();
  const { hospitalId } = useAuth();
  const [status, setStatus] = useState("active");
  const { mutate, isLoading } = useAddDepartment(hospitalId);

  const onCreateDepartment = async (data) => {
    const department = {
      name: data.departmentName,
      description: data.message,
      hospital_id: hospitalId,
      status: status
    };
    await mutate(department, {
      onSuccess: () => {
        methods.reset();
        handleClose(); // Close the modal after successful submission
      },
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onCreateDepartment)}>
        <div className="d-flex justify-content-end mb-2">
          <select
            className="hospital-draft-btn text-primary status-select"
            onChange={(e) => setStatus(e.target.value)}
            defaultValue={status}
          >
            <option value="active">Active</option>
            <option value="inactive">In Active</option>
          </select>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <InputField
              name="departmentName"
              label="Department Name"
              validation={{ required: "Department Name is required" }}
              placeholder="Enter Department Name"
              type="text"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-md-12">
            <TextArea
              name="message"
              label="Description"
              placeholder="Type message here"
            />
          </div>
        </div>

        <div className="form-group d-flex justify-content-end pt-3">
          <button
            to="#"
            //   data-bs-toggle="modal"
            //   data-bs-target="#delete_invoices_details"
            className="hospital-draft-btn text-primary pt-1 pb-1 ps-3 pe-3 rounded"
            onClick={() => handleClose()}
          >
            Cancel
          </button>
          <button
            to="#"
            //   data-bs-toggle="modal"
            //   data-bs-target="#save_invocies_details"
            className="hospital-add-btn ms-1 text-white border-0 pt-1 pb-1 ps-3 pe-3 rounded"
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}
            <span className="ps-2">Save</span>
          </button>
        </div>
      </form>
    </FormProvider>
  );
}

//props validation
DepartmentForm.propTypes = {
  handleClose: PropTypes.func,
};

export default DepartmentForm;
