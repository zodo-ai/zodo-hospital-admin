import StatusBadge from "../../assests/StatusBadge";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { generateCaseSheetPDF } from "../../../utils/pdfGenerator";
import { printericon } from "../../imagepath";
import { formatTime } from "../../configs/formatTime";
import DateSearchHero from "../../heros/DateSearchHero";
import DataTable from "../../Tables/DataTable";

function ServiceAppointmentTable(props) {
  const { appointmentList, loading, handleDate, query } = props;
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      // sorter: (a, b) => a.bookingid.length - b.bookingid.length,
    },
    {
      title: "Patient Name",
      dataIndex: "patientname",
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
      render: (_item, record) => (
        <div>{record?.user_details?.name ?? record?.user?.first_name}</div>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      // sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (_item, record) => (
        <div>{formatTime(record?.timeSlot) ?? "unassigned"}</div>
      ),
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (item) => (
        <div className="d-flex justify-content-center">
          <StatusBadge status={item} />
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (_item) => _item && <div>₹ {_item}</div>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_item, record) => {
        return (
          <div style={{ display: "flex", gap: 8, paddingLeft: "20px" }}>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                generateCaseSheetPDF(record);
              }}
              title="Print Case Sheet"
            >
              <img src={printericon} alt="Print Icon" width={17} />
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <DateSearchHero handleDate={handleDate} type="hospital-bookings" query={query}/>
      <DataTable
        columns={columns}
        dataSource={appointmentList ?? []}
        loading={loading}
      />
    </div>
  );
}
ServiceAppointmentTable.propTypes = {
  appointmentList: PropTypes.node,
  loading: PropTypes.bool,
  handleDate: PropTypes.func,
  query: PropTypes.string
};

export default ServiceAppointmentTable;
