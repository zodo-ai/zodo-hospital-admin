import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import SelectField from "../../Inputfields/SelectField";
import TextArea from "../../Inputfields/TextArea";
import { useAuth } from "../../../hooks/useAuth";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";
import { useAdduser } from "../../../hooks/users/useAdduser";
import { useHospitalStaffs } from "../../../hooks/users/useHospitalStaffs";
import ChooseFile from "../../Hospitals/ChooseFile";

function CreateStaff(props) {
  const { handleClose, userType } = props;
  const [status, setStatus] = useState(true);
  const { hospitalId } = useAuth();
  const { data: departmentList, isLoading } = useDepartmentList(hospitalId);
  const { mutate, isLoading: userLoading } = useAdduser(hospitalId);
  const { data: hospitalStaffs } = useHospitalStaffs(hospitalId);
  const [fileURL, setFileURL] = useState("");
  const methods = useForm();

  useEffect(() => {
    if (hospitalStaffs) {
      methods.reset();
      // handleClose();
    }
  }, [hospitalStaffs]);

  const onCreateStaff = async (data) => {
    const departmentIds =
      Array.isArray(data?.department) &&
      data?.department?.map((item) => item?.value);
    const staff = {
      first_name: data.staffname,
      last_name: "",
      email: data.staffemail,
      phone: data.phone,
      department_ids: departmentIds,
      // username: data.username,
      password: data.password,
      address: {
        line: data.address,
        pincode: data.pincode,
        street: data.street,
        city: data.city,
        state: data.state,
        // address: data.address,
      },
      job_title: data.jobtitle,
      user_type: userType ?? data.role.value,
      role: userType ?? data.role.value,
      is_active: status,
      hospital_id: hospitalId,
      profile_picture: fileURL,
    };
    await mutate(staff, {
      onSuccess: () => {
        methods.reset();
        handleClose();
      },
    });
  };
  const departmentOptions = departmentList?.map((department) => ({
    label: department.name,
    value: department.id,
  }));
  const roleOptions = [
    { label: "HsAdmin", value: "hsAdmin" },
    { label: "Staff", value: "staff" },
  ];

  const handleFileURL = (url) => {
    setFileURL(url);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded ps-1 pe-1"
        onSubmit={methods.handleSubmit(onCreateStaff)}
      >
        <div className="row">
          <div className="col-md-8">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL}/>
          </div>
          <div className="col-md-4 d-flex justify-content-end">
            <select
              className="hospital-draft-btn text-primary status-select"
              onChange={(e) => setStatus(e.target.value)}
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

          {!userType && (
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
          )}

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

        <div className="row">
          {/* <div className="col-md-6">
              <div className="form-group">
                <InputField
                  name="username"
                  label="User Name"
                  validation={{ required: "Username is required" }}
                  placeholder="Enter user name"
                  type="text"
                />
              </div>
            </div> */}
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="password"
                label="Password"
                validation={{ required: "Password is required" }}
                placeholder="Enter password"
                type="password"
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

        <div className="d-flex justify-content-end ps-3 pe-3 pb-5 pt-3">
          
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

// props validation
CreateStaff.propTypes = {
  handleClose: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  selectedStaff: PropTypes.node,
};

export default CreateStaff;
