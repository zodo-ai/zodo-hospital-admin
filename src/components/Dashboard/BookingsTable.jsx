import DataTable from "../Tables/DataTable";
import { useHospitalAppointments } from "../../hooks/appointments/useHospitalAppointments";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../assests/StatusBadge";
import { formatToDate } from "../configs/formatToDate";
import { formatTime } from "../configs/formatTime";
import { Link } from "react-router-dom";

function BookingsTable() {
  const { user } = useAuth();

  const hospitalId = user?.hospital_id;
  const { data: bookings, isLoading } = useHospitalAppointments(hospitalId);

  const recentBookings = bookings
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const columns = [
    {
      title: "BOOKING ID",
      dataIndex: "booking_id",
    },
    {
      title: "PATIENT NAME",
      dataIndex: "patientname",
      render: (item, record) => (
        <div>{record?.user_details?.name || record?.user?.first_name}</div>
      ),
    },
    {
      title: "TYPE",
      dataIndex: "type",
    },
    {
      title: "TIME",
      dataIndex: "timeSlot",
      render: (item) => <div>{item ? formatTime(item) : "N/A"}</div>,
    },
    {
      title: "APPOINTMENT DATE",
      dataIndex: "appointmentDate",
      sorter: (a, b) =>
        new Date(a.appointmentDate) - new Date(b.appointmentDate),
      render: (item) => <div>{formatToDate(item)}</div>,
    },
    {
      title: "ASSIGNED DOCTOR",
      dataIndex: "assingned",
      render: (item, record) =>
        record?.doctor?.name ? (
          <div>Dr.{record?.doctor?.name}</div>
        ) : (
          <div>{record.type === "service" ? "N/A" : "unasigned"}</div>
        ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      render: (item) => (
        <div>
          <StatusBadge status={item} />
        </div>
      ),
    },
  ];

  return (
    <div className="card-box mt-4">
      <div className="d-flex justify-content-between">
        <h4 style={{ fontWeight: "600" }}>Recent Booking Requests</h4>
        <Link to="/appointment" style={{ fontSize: "0.95rem" }}>
          {" "}
          See all{" "}
        </Link>
      </div>
      <DataTable
        columns={columns}
        dataSource={recentBookings ?? []}
        loading={isLoading}
      />
    </div>
  );
}

export default BookingsTable;
