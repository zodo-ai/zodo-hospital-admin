import { useEffect, useState } from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useCreateOfflineAppointments } from "../../hooks/appointments/useCreateOfflineAppointment";
import InputField from "../Inputfields/InputField";
import TextArea from "../Inputfields/TextArea";
import { Button } from "react-bootstrap";
import ModalTabs from "../tabs/ModalTabs";
import Timeslot from "../modals/Schedule/Timeslot";
import { useGetTimeslots } from "../../hooks/timeslot/useGetTimeslots";
import { categorizeSlots } from "../configs/categoriseSlots";
import { useDoctorsList } from "../../hooks/doctors/useDoctorsList";
import { useAuth } from "../../hooks/useAuth";
import SelectField from "../Inputfields/SelectField";
import PropTypes from "prop-types";
import { useDoctorView } from "../../hooks/doctors/useDoctorView";

function ConsultationAppointment({ handleClose }) {
  const { hospitalId } = useAuth();
  const { mutate: createAppointment, isLoading: appointmentLoading } =
    useCreateOfflineAppointments();
  const [timeSlot, setTimeSlot] = useState("");
  const [appointmentDate, setAppointmentDate] = useState();
  const [gender, setGender] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];

  const paymentTypeOptions = [
    { value: "online", label: "Online" },
    { value: "offline", label: "Cash on Hospital" },
  ];

  const { data: doctorsList, isLoading: doctorLoading } =
    useDoctorsList(hospitalId);

  const doctorOptions = doctorsList?.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  const [doctorId, setDoctorId] = useState("");
  const { data: doctor } = useDoctorView(doctorId);
  const isAutoBookingEnabled = doctor?.auto_booking_enabled;

  useEffect(() => {
    if (doctor) {
      const selectedDoctor = {
        value: doctor?.id,
        label: doctor?.name,
      };
      methods.reset({
        amount: doctor?.pricing ? parseInt(doctor?.pricing) : 0,
        doctor: selectedDoctor,
        gender: gender,
        paymentType: paymentType,
      });
    }
  }, [doctor]);

  const { data: timeslots, isLoading: timeslotLoading } = useGetTimeslots(
    doctorId,
    hospitalId,
    appointmentDate
  );

  const { morning, evening, afternoon } = categorizeSlots(timeslots || []);
  const handelTimeslot = (slot) => {
    setTimeSlot(slot);
  };

  const tabData = [
    {
      id: "schedule_morning",
      title: "Morning",
      content: (
        <Timeslot
          slots={morning || []}
          handelTimeslot={handelTimeslot}
          loading={timeslotLoading}
        />
      ),
      link: "morning",
      mainTab: "requested",
    },
    {
      id: "schedule_afternoon",
      title: "Afternoon",
      content: (
        <Timeslot
          slots={afternoon || []}
          handelTimeslot={handelTimeslot}
          loading={timeslotLoading}
        />
      ),
      link: "afternoon",
      mainTab: "requested",
    },
    {
      id: "schedule_evening",
      title: "Evening",
      content: (
        <Timeslot
          slots={evening || []}
          handelTimeslot={handelTimeslot}
          loading={timeslotLoading}
        />
      ),
      link: "evening",
      mainTab: "requested",
    },
  ];

  const WatchAppointmentChange = () => {
    const { control } = useFormContext();
    const appointment = useWatch({ control, name: "appointmentDate" }); // replace with your actual `name`
    const doctor = useWatch({ control, name: "doctor" }); // replace with your actual `name`
    const gender = useWatch({ control, name: "gender" });
    const paymentType = useWatch({ control, name: "paymentType" });
    useEffect(() => {
      if (appointment !== undefined || doctorId !== undefined) {
        // You can trigger any side-effect here
        setAppointmentDate(appointment);
        setDoctorId(doctor?.value ?? "");
        setGender(gender);
        setPaymentType(paymentType);
      }
    }, [appointment, doctor, gender, paymentType]);

    return null; // no UI output
  };

  const methods = useForm();

  const onCreateAppointment = (data) => {
    const appointmentData = {
      doctor_id: doctorId,
      appointmentDate: appointmentDate,
      is_online: false,
      amount: data.amount,
      user_details: {
        name: data.patientname,
        age: parseInt(data.patientAge),
        gender: data.gender.value,
        phone_number: data.contactNumber,
        address: data.address,
      },
      hospital_id: hospitalId,
      timeSlot: timeSlot,
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
                options={doctorOptions}
                label="Assign Doctor"
                name="doctor"
                isMultiSelect={false}
                placeholder="Select doctor"
                validationMessage="Doctor is required"
                isLoading={doctorLoading}
              />
            </div>
          </div>
          <div className="col-md-3">
            <InputField
              name="amount"
              label="Amount"
              // validation={{ required: "Amount is required" }}
              type="price"
              disabled
            />
          </div>
        </div>

        {/* <h4 className="card-title mt-4">More Information</h4> */}
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

        {!isAutoBookingEnabled && doctorId && (
          <>
            <h4 className="card-title mt-4">Available Timeslots</h4>
            <ModalTabs tabData={tabData} />
          </>
        )}

        <WatchAppointmentChange />

        {/* 📤 Submit */}
        <div className="d-flex justify-content-md-end justify-content-center ps-3 pe-3 pb-5 pt-3">
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

ConsultationAppointment.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default ConsultationAppointment;
