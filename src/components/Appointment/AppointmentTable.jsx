import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import DataTable from "../Tables/DataTable";
import { printericon } from "../imagepath";
import DateSearchHero from "../heros/DateSearchHero";
import { formatTime } from "../configs/formatTime";
import { generateCaseSheetPDF } from "../../utils/pdfGenerator";
import StatusBadge from "../assests/StatusBadge";
import { useApproveAppointment } from "../../hooks/appointments/useApproveAppointment";
import { formatToDate } from "../configs/formatToDate";
import ConfirmModal from "../modals/ConfirmModal";
import { useState } from "react";

function AppointmentTable(props) {
  const { appointmentList, loading, handleDate, query } = props;
  // const [prescriptionUrl, setPrescriptionUrl] = useState("");
  const { mutate } = useApproveAppointment();
  const [showApprove, setShowApprove] = useState(false);
  const [appointmentId,setAppointmentId] = useState("");
  // const handleClose = () => {
  //   setShow(false);
  // };
  // const handleView = (url) => {
  //   // Logic to handle view action
  //   setPrescriptionUrl(url);
  //   // Open the modal to show the prescription
  //   setShow(true);
  // };

  const handleAppointment = (id) => {
    setAppointmentId(id);
    setShowApprove(true);
    // mutate(id);
  };

  const approveAppointment = ()=>{
    mutate(appointmentId, {
      onSuccess:()=>{
        setShowApprove(false);
      }
    })
  }
  
  const columns = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
      // sorter: (a, b) => a.bookingid.length - b.bookingid.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      // sorter: (a, b) => a.type.length - b.type.length,
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
      title: <div className="text-center">Assigned Doctor</div>,
      dataIndex: "assingned",
      render: (_item, record) =>
        record?.doctor?.name ? (
          <div className="text-start">Dr.{record?.doctor?.name}</div>
        ) : (
          <div className="text-center">N/A</div>
        ),
    },

    {
      title: "Time Slot",
      dataIndex: "timeSlot",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (_item, record) => (
        <div>{formatTime(record?.timeSlot) ?? "unassigned"}</div>
      ),
    },
    {
      title: <div className="text-center">Appointment Date</div>,
      dataIndex: "appointmentDate",
      render: (item) => <div className="text-center">{formatToDate(item)}</div>,
      // sorter: (a, b) => a.time.length - b.time.length,
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
    {
      title: "",
      dataIndex: "FIELD8",
      render: (item, record) => (
        <>
          <div className="text-end">
            <div className="dropdown dropdown-action">
              <Link
                to="#"
                className="action-icon dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fas fa-ellipsis-v" />
              </Link>
              <div className="dropdown-menu dropdown-menu-end">
                <button
                  className="dropdown-item"
                  // to={`${record.id}`}
                  onClick={() => handleAppointment(record.id)}
                  disabled={record?.status === "completed"}
                >
                  <i className="fa fa-check me-2" />
                  Approve
                </button>
                {/* <Link
                  className="dropdown-item"
                  to
                  // onClick={() => handleEdit(record.id)}
                >
                  <i className="far fa-edit me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  // onClick={() => handleDeleteClick(record.id)}
                >
                  <i className="fa fa-trash-alt m-r-5"></i> Delete
                </Link> */}
              </div>
            </div>
          </div>
        </>
      ),
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
      {/* <CenteredModal show={show} handleClose={handleClose}>
        <Prescription prescriptionUrl={prescriptionUrl} />
      </CenteredModal> */}

      <ConfirmModal
        show={showApprove}
        setShow={setShowApprove}
        title="Are you sure you want to approve this appointment"
        handleClick={approveAppointment}
      />
    </div>
  );
}

AppointmentTable.propTypes = {
  appointmentList: PropTypes.node,
  loading: PropTypes.bool,
  handleDate: PropTypes.func,
  query: PropTypes.string,
};

export default AppointmentTable;
