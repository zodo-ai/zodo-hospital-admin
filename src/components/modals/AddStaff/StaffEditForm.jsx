import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useViewStaff } from "../../../hooks/staff/useViewStaff";
import { FormProvider, useForm } from "react-hook-form";
import ChooseFile from "../../Hospitals/ChooseFile";
import InputField from "../../Inputfields/InputField";
import SelectField from "../../Inputfields/SelectField";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";
import { useAuth } from "../../../hooks/useAuth";
import TextArea from "../../Inputfields/TextArea";
import { Button } from "react-bootstrap";
import { useEditStaff } from "../../../hooks/staff/useEditStaff";

function StaffEditForm(props) {
  const { handleClose, selectedStaff, userType } = props;
  const { hospitalId } = useAuth();
  const { data: staff } = useViewStaff(selectedStaff);
  const { data: departmentList, isLoading } = useDepartmentList(hospitalId);
  const [status, setStatus] = useState(true);
  const methods = useForm();
  const { mutate, isLoading: userLoading } = useEditStaff();
  const [fileURL, setFileURL] = useState("");

  const departmentOptions = departmentList?.map((department) => ({
    label: department.name,
    value: department.id,
  }));
  const roleOptions = [
    { label: "HsAdmin", value: "hsAdmin" },
    { label: "Staff", value: "staff" },
  ];
  useEffect(() => {
    if (staff) {
      const departments = staff?.departments.map((item) => {
        const department = { label: item.name, value: item.id };
        return department;
      });
      const roleOption = roleOptions.find(
        (item) => item.value === staff.user_type
      );

      setFileURL(staff?.profile_picture || "");

      setStatus(staff?.is_active);
      methods.reset({
        staffname: staff.first_name,
        staffemail: staff.email,
        phone: staff.phone,
        jobtitle: staff.job_title,
        role: roleOption,
        department: departments,
        // username: "",
        // password: staff.password,
        pincode: staff?.address?.pincode,
        street: staff?.address?.street,
        address: staff?.address?.line,
        city: staff?.address?.city,
        state: staff?.address?.state,
      });
    }
  }, [selectedStaff, methods, staff]);

  const onEditStaff = async (data) => {
    const departmentIds = data.department.map((item) => item.value);
    const staff = {
      first_name: data.staffname,
      last_name: "",
      email: data.staffemail,
      phone: data.phone,
      department_ids: departmentIds,
      address: {
        pincode: data.pincode,
        street: data.street,
        city: data.city,
        state: data.state,
        address: data.address,
        line: data?.address,
      },
      user_type: userType,
      //   role: data.role.value,
      is_active: status,
      hospital_id: hospitalId,
      profile_picture: fileURL,
    };

    mutate(
      { id: selectedStaff, data: staff },
      {
        onSuccess: () => {
          methods.reset();
          handleClose();
        },
      }
    );
  };

  const handleFileURL = (url) => {
    setFileURL(url);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded ps-1 pe-1"
        onSubmit={methods.handleSubmit(onEditStaff)}
      >
        <div className="row">
          <div className="col-md-8">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
          <div className="col-md-4 d-flex justify-content-md-end mt-md-0 mt-2">
            <select
              className="hospital-draft-btn text-primary status-select"
              onChange={(e) => setStatus(JSON.parse(e.target.value))}
              value={status}
            >
              <option value={true}>Active</option>
              <option value={false}>In Active</option>
            </select>
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="staffname"
                label="Staff Name"
                validation={{ required: "Staff Name is required" }}
                placeholder="Enter staff name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="staffemail"
                label="Staff Email ID"
                validation={{ required: "Email is required" }}
                placeholder="Enter staff email"
                type="email"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="phone"
                label="Phone Number"
                validation={{ required: "Phone number is required" }}
                placeholder="Enter phone number"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="jobtitle"
                label="Job Title"
                // validation={{ required: "Job title is required" }}
                placeholder="Enter job title"
                type="text"
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                options={roleOptions}
                label="Role"
                name="role"
                isMultiSelect={false}
                placeholder="Select role"
                validationMessage="Role is required"
                // isLoading={isLoading}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                options={departmentOptions}
                label="Department"
                name="department"
                isMultiSelect={true}
                placeholder="Select Department"
                validationMessage="Department is required"
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        <h4 className="card-title mt-2">Address</h4>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="pincode"
                label=""
                validation={{ required: "Pincode is required" }}
                placeholder="Pincode"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="form-group">
              <InputField
                name="street"
                label=""
                validation={{ required: "Area / Street / Sector is required" }}
                placeholder="Area / Street / Sector"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <TextArea
            name="address"
            label=""
            validation={{ required: "Address is required" }}
            placeholder="Enter Address"
          />
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="city"
                label=""
                validation={{ required: "Town / City is required" }}
                placeholder="Town / City"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="state"
                label=""
                validation={{ required: "State" }}
                placeholder="State"
                type="text"
              />
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-md-end  justify-content-center ps-md-3 pe-md-3 ps-0 pe-0 pb-5 pt-3">
          <Button variant="primary" className="ps-5 pe-5" type="submit">
            {userLoading && (
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

StaffEditForm.propTypes = {
  selectedStaff: PropTypes.node,
  handleClose: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
};

export default StaffEditForm;
