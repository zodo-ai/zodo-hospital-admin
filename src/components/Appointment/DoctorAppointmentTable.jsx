import DateSearchHero from "../heros/DateSearchHero";
import DataTable from "../Tables/DataTable";
import PropTypes from "prop-types";
import { formatTime } from "../configs/formatTime";
import StatusBadge from "../assests/StatusBadge";
import { Link } from "react-router-dom";
import { printericon } from "../imagepath";
import { generateCaseSheetPDF } from "../../utils/pdfGenerator";
import { formatToDate } from "../configs/formatToDate";

function DoctorAppointmentTable(props) {
  const { appointmentList, loading, handleDate, id } = props;
  // const [show, setShow] = useState(false);
  // const [prescriptionUrl, setPrescriptionUrl] = useState("");
  // const handleClose = () => {
  //   setShow(false);
  // };
  // const handleView = (url) => {
  //   // Logic to handle view action
  //   setPrescriptionUrl(url);
  //   // Open the modal to show the prescription
  //   setShow(true);
  // };
  const columns = [
    {
      title: "BOOKING ID",
      dataIndex: "booking_id",
      // sorter: (a, b) => a.bookingid.length - b.bookingid.length,
    },
    {
      title: "TYPE",
      dataIndex: "type",
      // sorter: (a, b) => a.type.length - b.type.length,
    },
    {
      title: "PATIENT NAME",
      dataIndex: "patientname",
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
      render: (_item, record) => (
        <div>{record?.user_details?.name ?? record?.user?.first_name}</div>
      ),
    },
    {
      title: "TIME SLOT",
      dataIndex: "timeSlot",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (_item, record) => (
        <div>{_item ? formatTime(record?.timeSlot) : "unassigned"}</div>
      ),
    },
    {
      title: "APPOINTMENT DATE",
      dataIndex: "appointmentDate",
      render: (item) => <div>{formatToDate(item)}</div>,
      sorter: (a, b) => {
        return new Date(a.appointmentDate) - new Date(b.appointmentDate);
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      // filters: [
      //   { text: "completed", value: "completed" },
      //   { text: "accepted", value: "accepted" },
      //   { text: "started", value: "started" },
      //   { text: "rejected", value: "rejected" },
      // ],
      // onFilter: (value, record) => record.status.startsWith(value),
      // filterSearch: true,
      render: (item) => (
        <div>
          <StatusBadge status={item} />
        </div>
      ),
    },
    {
      title: "ACTION",
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
      <DateSearchHero handleDate={handleDate} type="doctor-booking" id={id} />
      <DataTable
        columns={columns}
        dataSource={appointmentList ?? []}
        loading={loading}
      />
      {/* <CenteredModal show={show} handleClose={handleClose}>
        <Prescription prescriptionUrl={prescriptionUrl} />
      </CenteredModal> */}
    </div>
  );
}

DoctorAppointmentTable.propTypes = {
  appointmentList: PropTypes.node,
  loading: PropTypes.bool,
  handleDate: PropTypes.func,
  id: PropTypes.string,
};

export default DoctorAppointmentTable;
