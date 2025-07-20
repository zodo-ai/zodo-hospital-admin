import { useEffect, useState } from "react";
import ChooseFile from "../../Hospitals/ChooseFile";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import SelectField from "../../Inputfields/SelectField";
import { useAuth } from "../../../hooks/useAuth";
import { useSpecialisationList } from "../../../hooks/specialisation/useSpecialisationList";
import { useAddDoctors } from "../../../hooks/doctors/useAddDoctors";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useDoctorsList } from "../../../hooks/doctors/useDoctorsList";
import TextArea from "../../Inputfields/TextArea";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";

function Overview(props) {
  const { handleClose } = props;
  const { hospitalId } = useAuth();
  const methods = useForm();
  const [fileURL, setFileURL] = useState("");
  const { data: doctorsList } = useDoctorsList(hospitalId);
  const { data: departmentList, isLoading: departmentLoading } =
    useDepartmentList(hospitalId);
  const { data: specialisationList, isLoading: specialisationLoading } =
    useSpecialisationList(hospitalId);
  const { mutate, isLoading } = useAddDoctors(hospitalId);
  const specialisationOptions = Array.isArray(specialisationList)
    ? specialisationList?.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    : [];

  const departmentOptions = departmentList?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    if (doctorsList) {
      methods.reset();
    }
  }, [doctorsList]);

  const onCreateDoctor = async (data) => {
    const doctor = {
      name: data.doctorname,
      email: data.doctoremail,
      profile_pic: fileURL,
      pricing: parseInt(data.pricing),
      specifications_id: data?.specialisations?.map((item) => item.value),
      phone_number: data.phone,
      hospital_id: hospitalId,
      registration_details: {
        registration_number: data.registrationNumber,
        council_name: data.councilName,
        joining_date: data?.joiningDate,
      },
      department_id: data?.departments?.map((item) => item.value),
      documents: [],
      consultation_duration: parseInt(data?.duration),
      work_start_date: data?.workstartDate,
      about: data?.about,
    };

    // console.log(mutate);

    await mutate(doctor, {
      onSuccess: () => {
        methods.reset();
        handleClose();
      }
    });
    // methods.reset();
    // handleClose();
  };

  const handleFileURL = (url) => {
    setFileURL(url);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded p-4"
        onSubmit={methods.handleSubmit(onCreateDoctor)}
      >
        <div className="row">
          <div className="col-md-8 ms-md-3">
            <ChooseFile handleFileURL={handleFileURL} fileURL={fileURL} />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="doctorname"
                label="Doctor Name"
                validation={{ required: "Doctor Name is required" }}
                placeholder="Enter doctor name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="doctoremail"
                label="Doctor Email ID"
                validation={{ required: "Doctor email is required" }}
                placeholder="Enter doctor email"
                type="email"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="phone"
                label="Phone Number"
                validation={{ required: "Phone number is required" }}
                placeholder="Enter doctor phone number"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="pricing"
                label="Pricing"
                validation={{ required: "Pricing is required" }}
                placeholder="Enter pricing"
                type="price"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <InputField
                name="duration"
                label="Consultation Duration"
                validation={{ required: "Consultation duration is required" }}
                placeholder="Enter duration in minutes"
                type="number"
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                options={specialisationOptions}
                label="Specialisations"
                name="specialisations"
                isMultiSelect={true}
                placeholder="Select specialisation"
                validationMessage="Specialisations are required"
                isLoading={specialisationLoading}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <SelectField
                options={departmentOptions}
                label="Departments"
                name="departments"
                isMultiSelect={true}
                placeholder="Select departments"
                validationMessage="Departments are required"
                isLoading={departmentLoading}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <TextArea
              name="about"
              label="About"
              // validation={{ required: "Description is required" }}
              placeholder="Write here.."
              // disabled={isSameAsCompanyAddress}
            />
          </div>
        </div>

        <h4 className="card-title mt-2">Registration Details {"(Optional)"}</h4>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="registrationNumber"
                label="Registration Number"
                placeholder="Enter registration number"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="councilName"
                label="Council Name"
                placeholder="Enter council name"
                type="text"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <InputField
                name="joiningDate"
                label="Joining Date"
                placeholder="Joining date"
                type="date"
              />
            </div>

            <div className="form-group col-md-6">
              <InputField
                name="workstartDate"
                label="Work Start Date"
                validation={{
                  required: "Work start date is required",
                }}
                placeholder="Work start date"
                type="date"
              />
            </div>
          </div>

          <div className="d-flex justify-content-end ps-3 pe-3 pb-5 pt-3">
            <Button variant="primary" type="submit" className="ps-5 pe-5">
              {isLoading && (
                <span
                  className="spinner-border spinner-border-sm"
                  aria-hidden="true"
                ></span>
              )}
              <span className="ps-2">Submit</span>
            </Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

Overview.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default Overview;
