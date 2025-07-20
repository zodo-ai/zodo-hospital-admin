import InfoCards from "./Info_cards";
import {
  circular_exclamation,
  circular_tick,
  emptyWallet,
  tag,
} from "../imagepath";
import Analytics from "./Analytics";
import BookingsTable from "./BookingsTable";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useViewHospital } from "../../hooks/hospital/useViewHospital";

function FastTag({ data }) {
  const { count, revenue } = data || {};
  const { hospitalId } = useAuth();
  const { data: hospitalData } = useViewHospital(hospitalId);
  const basicInformation = [
    {
      id: 1,
      title: "Fasttag Status",
      icon: hospitalData?.fastTag?.enabled
        ? circular_tick
        : circular_exclamation,
      count: hospitalData?.fastTag?.enabled,
      percentageUp: 20,
      link: "",
      type: "fasttag",
    },
    {
      id: 2,
      title: "Total FASTag Issued",
      icon: tag,
      count: count || 0,
      percentageUp: 40,
      link: "",
      type: "count",
    },
    {
      id: 3,
      title: "Total FASTag Revenue",
      icon: emptyWallet,
      count: revenue || 0,
      percentageUp: 40,
      link: "",
      type: "currency",
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
      <Analytics bookingType={bookingType} id="fasttag-chart" />
      <BookingsTable />
    </div>
  );
}

// props validation
FastTag.propTypes = {
  data: PropTypes.object,
};

export default FastTag;
