import InfoCards from "./Info_cards";
import { dep_icon1, doctors, ProfileUser } from "../imagepath";
import Analytics from "./Analytics";
import BookingsTable from "./BookingsTable";
import PropTypes from "prop-types";

function HospitalStaf({ data }) {
  const { doctors_count, admin_count, staff_count } = data || {};
  const basicInformation = [
    {
      id: 1,
      title: "Total Doctors",
      icon: dep_icon1,
      count: doctors_count || 0,
      percentageUp: 20,
      link: "",
      type: "count",
    },
    {
      id: 2,
      title: "Total Admins",
      icon: doctors,
      count: admin_count || 0,
      percentageUp: 40,
      link: "",
      type: "count",
    },
    {
      id: 3,
      title: "Total Staff",
      icon: ProfileUser,
      count: staff_count || 0,
      percentageUp: 40,
      link: "",
      type: "count",
    },
  ];

  const bookingType = [
    { value: "fast_tag", label: "Fasttag Booking" },
    { value: "normal", label: "Normal Booking" },
  ];

  return (
    <div>
      <div className="row mt-3">
        <InfoCards info={basicInformation} />
      </div>
      <Analytics bookingType={bookingType} id="staff-chart" />
      <BookingsTable />
    </div>
  );
}

// props validation 
HospitalStaf.propTypes = {
  data: PropTypes.object,
};

export default HospitalStaf;
