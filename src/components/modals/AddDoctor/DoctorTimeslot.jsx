import PropTypes from "prop-types";
import Availability from "./Timeslots/Availability";
import { useDoctorView } from "../../../hooks/doctors/useDoctorView";
import { useAutoSloting } from "../../../hooks/timeslot/useAutoSloting";

function DoctorTimeslot(props) {
  const { selectedDoctor } = props;
  const { mutate } = useAutoSloting();
  // console.log(selectedDoctor);
  const { data:doctor } = useDoctorView(selectedDoctor)
  // const tabData = [
  //   { id: "morning", title: "Morning", content: <Timeslots /> },
  //   { id: "afternoon", title: "Afternoon", content: <Timeslots /> },
  //   {
  //     id: "evening",
  //     title: "Evening",
  //     content: <Timeslots />,
  //   },
  // ];
  
  const handleSlot = async () => {
    const data = {
      enabled: !doctor?.auto_booking_enabled,
    };
    await mutate({ id: selectedDoctor, data: data });
  };

  return (
    <div className="doctor-timeslot mt-3">
      <div className="row mt-2">
        <div className="col-md-4">
          <div className="form-group">
            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me ms-3">
              Auto Slotting
              <input
                type="checkbox"
                name="autoslot"
                onClick={handleSlot}
                checked={doctor?.auto_booking_enabled}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      </div>
      <Availability selectedDoctor={doctor} />
      {/* <SlotManager selectedDoctor={selectedDoctor}/> */}
      {/* <ModalTabs tabData={tabData} /> */}
    </div>
  );
}

// props validation
DoctorTimeslot.propTypes = {
  selectedDoctor: PropTypes.object,
};

export default DoctorTimeslot;
