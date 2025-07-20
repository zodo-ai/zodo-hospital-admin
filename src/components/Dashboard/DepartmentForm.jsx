import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";
import { useAddDepartment } from "../../hooks/departments/useAddDepartment";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../Inputfields/InputField";
import { useAuth } from "../../hooks/useAuth";

function DepartmentForm(props) {
  const { handleClose } = props;
  const { user } = useAuth();
  const hospitalId = user["hospital_id"];
  const { mutate, isLoading } = useAddDepartment();
  const methods = useForm();
  const onCreateDepartment = async (data) => {
    const department = {
      name: data.department,
      // category: data.category,
      description: "",
      hospital_id: hospitalId,
      // department_head: data.departmentHead,
    };
    await mutate(department);
    methods.reset();
    // handleClose();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onCreateDepartment)}>
        <div className="row mt-3">
          <div className="col-md-10">
            <div className="form-group">
              {/* <label>Department Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter department name"
              /> */}
              <InputField
                name="department"
                label="Department Name"
                validation={{ required: "Department Name is required" }}
                placeholder="Enter department name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-2">
            <div className="form-group">
              <label>Status</label>
              <select className="form-control text-primary">
                <option>Active</option>
                <option>In Active</option>
              </select>
            </div>
          </div>
        </div>
        <h4 className="card-title mt-2">Department Details</h4>
        <div className="form-group mt-3">
          {/* <label>Category</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter type"
          /> */}
          <InputField
            name="category"
            label="Category"
            validation={{ required: "Category is required" }}
            placeholder="Enter type"
            type="text"
          />
        </div>
        <div className="form-group">
          {/* <label>Department Head (Optional)</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter type"
          /> */}
          <InputField
            name="departmentHead"
            label="Department Head (Optional)"
            placeholder="Enter department head"
            type="text"
          />
        </div>
        <div className="d-flex justify-content-between ps-3 pe-3 pb-5 pt-4">
          <Button
            variant="outline-primary"
            onClick={() => handleClose()}
            className="ps-5 pe-5"
          >
            Back
          </Button>
          <Button
            variant="primary"
            // onClick={handleClose}
            className="ps-5 pe-5"
            type="submit"
          >
            {isLoading && (
              <span
                className="spinner-border spinner-border-sm"
                aria-hidden="true"
              ></span>
            )}
            <span className="ps-2">Submit</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

// props validation
DepartmentForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default DepartmentForm;
