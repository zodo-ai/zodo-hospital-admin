import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import TextArea from "../../Inputfields/TextArea";
import { useEditDepartment } from "../../../hooks/departments/useEditDepartment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useViewDepartment } from "../../../hooks/departments/useViewDepartment";

function DepartmentEditForm(props) {
  const { handleClose, departmentId } = props;
  const { data: departmentDetails } = useViewDepartment(departmentId);
  const [status,setStatus] = useState(departmentDetails?.status);
  const methods = useForm();
  const { mutate, isLoading } = useEditDepartment();

  useEffect(() => {
    methods.reset({
      departmentName: departmentDetails?.name,
      message: departmentDetails?.description,
    });
  }, [departmentDetails]);

  const onCreateDepartment = async (data) => {
    const department = {
      name: data.departmentName,
      description: data.message,
      status: status
    };
    await mutate(
      { id: departmentId, data: department },
      {
        onSuccess: () => {
          methods.reset();
          handleClose(); // Close the modal after successful submission
        },
      }
    );
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
              placeholder="Type description here"
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
DepartmentEditForm.propTypes = {
  departmentId: PropTypes.string,
  handleClose: PropTypes.func,
};

export default DepartmentEditForm;
