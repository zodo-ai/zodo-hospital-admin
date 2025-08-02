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
  const { mutate } = useApproveAppointment();
  const [showApprove, setShowApprove] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");

  const handleAppointment = (id) => {
    setAppointmentId(id);
    setShowApprove(true);
  };

  const approveAppointment = () => {
    mutate(appointmentId, {
      onSuccess: () => {
        setShowApprove(false);
      },
    });
  };

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
      title: "ASSIGNED DOCTOR",
      dataIndex: "assingned",
      render: (_item, record) =>
        record?.doctor?.name ? (
          <div>Dr.{record?.doctor?.name}</div>
        ) : (
          <div>N/A</div>
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
      filters: [
        { text: "completed", value: "completed" },
        { text: "accepted", value: "accepted" },
        { text: "started", value: "started" },
        { text: "rejected", value: "rejected" },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
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
        return record.type !== "fast_tag" ? (
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
        ) : (
          <div className="text-center">N/A</div>
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
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div>
      <DateSearchHero
        handleDate={handleDate}
        type="hospital-bookings"
        query={query}
      />
      <DataTable
        columns={columns}
        dataSource={appointmentList ?? []}
        loading={loading}
      />
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
