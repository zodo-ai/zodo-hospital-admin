import InfoCards from "./Info_cards";
import { emptyWallet, menuicon04, menuicon05 } from "../imagepath";
import Analytics from "./Analytics";
import BookingsTable from "./BookingsTable";
import PropTypes from "prop-types";

function AppointmentInfo({ data }) {
  const { request_count, count, revenue } = data || {};
  const basicInformation = [
    {
      id: 1,
      title: "Appointment Requests",
      icon: menuicon04,
      count: request_count || 0,
      percentageUp: 20,
      link: "",
      type:"count"
    },
    {
      id: 2,
      title: "Total Appointments",
      icon: menuicon05,
      count: count || 0,
      percentageUp: 40,
      link: "",
      type:"count"
    },
    {
      id: 3,
      title: "Appointment Revenue",
      icon: emptyWallet,
      count: revenue || 0,
      percentageUp: 40,
      link: "",
      type:"currency"
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
      <Analytics bookingType={bookingType} id="appointment-chart" />
      <BookingsTable />
    </div>
  );
}

// props validation
AppointmentInfo.propTypes = {
  data: PropTypes.object,
};

export default AppointmentInfo;
