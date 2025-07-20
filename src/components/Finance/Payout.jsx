import { clock, emptyWallet, fasttag, inboxicon } from "../imagepath";
import Analytics from "../Dashboard/Analytics";
import SettlementCard from "./SettlementCard";
import PropTypes from "prop-types";
import PayoutTable from "./PayoutTable";

function Payout({ data }) {
  const basicInformation = [
    {
      id: 1,
      title: "Total Payout Requests",
      icon: fasttag,
      count: data?.settlement?.requested || 0,
      percentageUp: 20,
      link: "",
      type: "",
    },
    {
      id: 2,
      title: "Pending Settlements",
      icon: clock,
      count: data?.settlement?.pending || 0,
      percentageUp: 40,
      link: "",
      type: "count",
    },
    {
      id: 3,
      title: "Total Revenue",
      icon: emptyWallet,
      count: data?.settlement?.total || 0,
      percentageUp: 40,
      link: "",
      type: "currency",
    },
    {
      id: 4,
      title: "Normal Booking Revenue",
      icon: emptyWallet,
      count: data?.booking?.revenue || 0,
      percentageUp: 40,
      link: "",
      type: "currency",
    },
    {
      id: 5,
      title: "Fast Tag Revenue",
      icon: emptyWallet,
      count: data?.fasttag?.revenue || 0,
      percentageUp: 40,
      link: "",
      type: "currency",
    },
    {
      id: 6,
      title: "Intitiate Settlement Request",
      icon: inboxicon,
      count: 121,
      percentageUp: 40,
      link: "",
      type: "paymentrequest",
    },
  ];
  const bookingType = [
    { value: "fast_tag", label: "Fasttag Booking" },
    { value: "normal", label: "Normal Booking" },
  ];
  return (
    <div>
      <div className="row mt-3">
        <SettlementCard info={basicInformation} />
      </div>
      <Analytics bookingType={bookingType} id="appointment-chart" />
      <PayoutTable />
    </div>
  );
}

// props validation
Payout.propTypes = {
  data: PropTypes.object,
};

export default Payout;
