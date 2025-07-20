import { useEffect, useState } from "react";
import ChooseFile from "../../Hospitals/ChooseFile";
import { FormProvider, useForm } from "react-hook-form";
import InputField from "../../Inputfields/InputField";
import SelectField from "../../Inputfields/SelectField";
import { useAuth } from "../../../hooks/useAuth";
import { useSpecialisationList } from "../../../hooks/specialisation/useSpecialisationList";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { useDoctorView } from "../../../hooks/doctors/useDoctorView";
import { useEditDoctors } from "../../../hooks/doctors/useEditDoctors";
import { toInputDateFormat } from "../../configs/toInputDateFormat";
import TextArea from "../../Inputfields/TextArea";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";

function EditOverview(props) {
  const { handleClose, selectedDoctor } = props;
  const { data: doctor } = useDoctorView(selectedDoctor);
  const { hospitalId } = useAuth();
  const methods = useForm();
  // const [joiningDate, setJoiningDate] = useState();
  const [fileURL, setFileURL] = useState("");
  const { data: departmentList, isLoading: departmentLoading } =
    useDepartmentList(hospitalId);
  const { data: specialisationList, isLoading: specialisationLoading } =
    useSpecialisationList(hospitalId);
  const { mutate, isLoading } = useEditDoctors();

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
    if (doctor) {
      // const selectedDepartments = doctor?.department.filter((item)=> )
      setFileURL(doctor?.profile_pic);
      const specialisation = doctor?.specialisations;
      const specialisations = specialisation.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      const departmentList = doctor?.departments || [];
      const departments = departmentList.map((item) => ({
        label: item.name,
        value: item.id,
      }));

      const workstartDate = toInputDateFormat(doctor?.work_start_date);
      const joiningDate = toInputDateFormat(
        doctor?.registration_details?.joining_date
      );
      

      methods.reset({
        doctorname: doctor.name,
        doctoremail: doctor.email,
        profile_pic: fileURL,
        // city: "Kochi",
        jobTitle: doctor?.job_title,
        pricing: doctor.pricing,
        specialisations: specialisations,
        phone: doctor?.phone_number,
        registrationNumber: doctor?.registration_details?.registration_number,
        councilName: doctor?.registration_details?.council_name,
        // joiningDate: doctor?.registration_details?.joining_date,
        departments: departments,
        workstartDate: workstartDate,
        joiningDate: joiningDate,
        duration: doctor?.consultation_duration,
        about: doctor?.about,
      });

      // setJoiningDate(doctor?.registration_details?.joining_date);
    }
  }, [doctor, methods]);

  const onCreateDoctor = async (data) => {
    const departments = data?.departments?.map((item) => item.value);
    const specialisations = data?.specialisations?.map((item) => item.value);
    const doctor = {
      name: data.doctorname,
      email: data.doctoremail,
      profile_pic: fileURL,
      pricing: parseInt(data.pricing),
      specifications_id: specialisations,
      phone_number: data.phone,
      hospital_id: hospitalId,
      registration_details: {
        registration_number: data.registrationNumber,
        council_name: data.councilName,
        joining_date: data?.joiningDate,
      },
      department_ids: departments,
      consultation_duration: parseInt(data?.duration),
      work_start_date: data?.workstartDate,
      about: data?.about,
    };    
    
    await mutate(
      { id: selectedDoctor, data: doctor },
      {
        onSuccess: () => {
          methods.reset();
          handleClose();
        },
        onError: () => {
          handleClose();
        },
      }
    );
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
                placeholder="Enter doctor pricing"
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
            <TextArea name="about" label="About" placeholder="Write here.." />
          </div>
        </div>

        <h4 className="card-title mt-2">Registration Details {"(Optional)"}</h4>

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              {/* <label>Registration Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter registration number"
              /> */}

              <InputField
                name="registrationNumber"
                label="Registration Number"
                // validation={{ required: "Registration number is required" }}
                placeholder="Enter registration number"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              {/* <label>Council Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter council name"
              /> */}
              <InputField
                name="councilName"
                label="Council Name"
                // validation={{ required: "Registration number is required" }}
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

          <div className="d-flex justify-content-end ps-3 pe-3 pb-5 mt-3">
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

EditOverview.propTypes = {
  handleClose: PropTypes.func.isRequired,
  selectedDoctor: PropTypes.node,
};

export default EditOverview;
