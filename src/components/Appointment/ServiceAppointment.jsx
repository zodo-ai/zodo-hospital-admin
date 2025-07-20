import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import InputField from "../Inputfields/InputField";
import TextArea from "../Inputfields/TextArea";
import { Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import SelectField from "../Inputfields/SelectField";
import PropTypes from "prop-types";
import { useHospitalServices } from "../../hooks/hospital-services/useHospitalServices";
import { useCreteServiceAppointment } from "../../hooks/appointments/useCreateServiceAppointment";
import { useEffect, useState } from "react";
import { useViewService } from "../../hooks/hospital-services/useViewService";
function ServiceAppointment({ handleClose }) {
  const { hospitalId } = useAuth();
  const { mutate: createAppointment, isLoading: appointmentLoading } =
    useCreteServiceAppointment();
  const [serviceId, setServiceId] = useState("");
  const [gender, setGender] = useState("");
  const [paymentType, setPaymentType] = useState("");
  // const [selectedTimeSlot, setSelectedTimeslot] = useState("");
  //   const [timeSlot, setTimeSlot] = useState("");
  //   const [appointmentDate, setAppointmentDate] = useState();
  const { data: servicesList, isLoading: servicesLoading } =
    useHospitalServices(hospitalId);
  const { data: serviceDetails } = useViewService(serviceId);

  useEffect(() => {
    if (serviceDetails) {
      const selectedService = {
        value: serviceDetails?.id,
        label: serviceDetails?.name,
      };
      methods.reset({
        amount: serviceDetails?.strike_through_price ? parseInt(serviceDetails?.strike_through_price) : 0,
        service: selectedService,
        gender: gender,
        paymentType: paymentType,
      });
    }
  }, [serviceDetails]);

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const paymentTypeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Cash on Hospital" },
  ];

  const serviceOptions = servicesList?.map((item) => ({
    label: item?.name,
    value: item?.id,
  }));

  // const handleTime = (time) => {
  //   setSelectedTimeslot(time);
  // };

  const WatchAppointmentChange = () => {
    const { control } = useFormContext();
    const service = useWatch({ control, name: "service" }); // replace with your actual `name`
    const gender = useWatch({ control, name: "gender" });
    const paymentType = useWatch({ control, name: "paymentType" });

    useEffect(() => {
      if (
        service !== undefined ||
        gender !== undefined ||
        paymentType !== undefined
      ) {
        // You can trigger any side-effect here
        setPaymentType(paymentType);
        setGender(gender);
        setServiceId(service?.value);
      }
    }, [service, gender, paymentType]);

    return null; // no UI output
  };

  const methods = useForm();

  const onCreateAppointment = (data) => {
    const appointmentData = {
      //   doctor_id: doctorId,
      hospital_service_id: data?.service?.value,
      appointmentDate: data.appointmentDate,
      amount: data.amount,
      user_details: {
        name: data.patientname,
        age: parseInt(data.patientAge),
        gender: data.gender.value,
        phone_number: data.contactNumber,
        address: data.address,
      },
      hospital_id: hospitalId,
      // timeSlot: selectedTimeSlot,
      payment_type: data?.paymentType?.value,
      reason: data?.note,

      // type:appointment
    };

    createAppointment(appointmentData, {
      onSuccess: () => {
        handleClose();
        methods.reset();
      },
    });
  };
  return (
    <FormProvider {...methods}>
      <form
        className="bg-white rounded ps-1 pe-1"
        onSubmit={methods.handleSubmit(onCreateAppointment)}
      >
        <h4 className="card-title mt-2">Patient Details</h4>
        <div className="row mt-2">
          <div className="col-md-6">
            <div className="form-group">
              <InputField
                name="patientname"
                label="Patient Name"
                validation={{ required: "Patient Name is required" }}
                placeholder="Enter patient name"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-group">
              <InputField
                name="patientAge"
                label="Patient Age"
                validation={{ required: "Patient age is required" }}
                placeholder="Patient age"
                type="number"
              />
            </div>
          </div>

          <div className="col-md-2">
            <div className="form-group">
              <SelectField
                options={genderOptions}
                label="Gender"
                name="gender"
                isMultiSelect={false}
                placeholder="Select Gender"
                validationMessage="Gender is required"
                // isLoading={isLoading}
              />
            </div>
          </div>
        </div>

        {/* 🧾 Shared Inputs */}
        <div className="row">
          <div className="col-md-4">
            <InputField
              name="contactNumber"
              label="Contact Number"
              validation={{ required: "Contact number is required" }}
              placeholder="Contact number"
              type="text"
            />
          </div>

          <div className="col-md-5">
            <div className="form-group">
              <SelectField
                options={serviceOptions}
                label="Services"
                name="service"
                isMultiSelect={false}
                placeholder="Select service"
                validationMessage="Service is required"
                isLoading={servicesLoading}
              />
            </div>
          </div>
          <div className="col-md-3">
            <InputField
              name="amount"
              label="Amount"
              validation={{ required: "Amount is required" }}
              type="price"
              disabled={true}
            />
          </div>
        </div>

        <div className="row mt-2">
          <div className="col-md-3">
            <InputField
              name="appointmentDate"
              label="Appointment Date"
              validation={{ required: "Appointment date is required" }}
              type="date"
            />
          </div>
          <div className="col-md-4">
            {/* <label className="form-label">Payment Type</label>
              <Select
                options={paymentType}
                placeholder="Payment Type"
                isMultiSelect={false}
                onChange={(selectedOption) =>
                  setPaymentType(selectedOption.value ?? "")
                }
              /> */}
            <div className="form-group">
              <SelectField
                options={paymentTypeOptions}
                label="Payment Type"
                name="paymentType"
                isMultiSelect={false}
                placeholder="Select payment type"
                validationMessage="Payment type is required"
                //   isLoading={servicesLoading}
              />
            </div>
          </div>
          {/* <div className="col-md-4">
            <InputField
              name="coupencode"
              label="Coupen Code"
              placeholder="Coupen code"
              type="text"
            />
          </div> */}
        </div>

        <div className="row mt-2">
          <div className="col">
            <TextArea
              name="address"
              label="Address"
              validation={{ required: "Address is required" }}
              placeholder="Enter Address"
            />
          </div>
        </div>
        <div className="row mt-2">
          <div className="col">
            <TextArea
              name="note"
              label="Patient Note"
              placeholder="Enter patient note"
            />
          </div>
        </div>

        {/* <h4 className="card-title mt-4">Avaliable Timeslots</h4>

        <ServiceTimeSlot handleTime={handleTime} /> */}
        <WatchAppointmentChange />

        <div className="d-flex  justify-content-md-end justify-content-center  ps-3 pe-3 pb-5 pt-3 ">
          <Button variant="primary" className="ps-5 pe-5" type="submit">
            {appointmentLoading && (
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

ServiceAppointment.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ServiceAppointment;
