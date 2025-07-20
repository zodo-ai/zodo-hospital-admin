import DateSearchHero from "../heros/DateSearchHero";
import DataTable from "../Tables/DataTable";
import PropTypes from "prop-types";
import { formatTime } from "../configs/formatTime";
import StatusBadge from "../assests/StatusBadge";
import { Link } from "react-router-dom";
import { printericon } from "../imagepath";
import { generateCaseSheetPDF } from "../../utils/pdfGenerator";

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
      render: (item) => <div className="d-flex justify-content-center"><StatusBadge status={item} /></div>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (_item) => _item && <div>₹ {_item}</div>,
    },
    // {
    //   title: "Prescription",
    //   dataIndex: "prescription",
    //   render: (_item, record) => {
    //     return record?.prescriptionUrl ? (
    //       <div style={{ display: "flex", gap: 8, paddingLeft: "20px" }}>
    //         <Link to onClick={() => handleView(record?.prescriptionUrl)}>
    //           View
    //         </Link>
    //         <Link to>
    //           <img src={pdficon} alt="Pdf Icon" width={17} />
    //         </Link>
    //       </div>
    //     ) : (
    //       <div style={{ paddingLeft: "25px" }}>N/A</div>
    //     );
    //   },
    // },
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
      <DateSearchHero handleDate={handleDate} type="doctor-booking" id={id}/>
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
  id: PropTypes.string
};

export default DoctorAppointmentTable;
