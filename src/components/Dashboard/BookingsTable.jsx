import DataTable from "../Tables/DataTable";
import { useHospitalAppointments } from "../../hooks/appointments/useHospitalAppointments";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../assests/StatusBadge";
import { formatToDate } from "../configs/formatToDate";

function BookingsTable() {
  const { user } = useAuth();

  const hospitalId = user?.hospital_id;
  const { data: bookings, isLoading } = useHospitalAppointments(
    hospitalId
  );

  const recentBookings = bookings?.sort((a, b )=> new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5)
  // console.log(bookings);
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
      render: (item, record) => (
        <div>{record?.user_details?.name || record?.user?.first_name}</div>
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
      render: (item) => <div>{item ? item : "N/A"}</div>,
    },
    {
      title: "Appointement",
      dataIndex: "appointmentDate",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (item) => <div>{formatToDate(item)}</div>,
    },
    {
      title: "Assigned",
      dataIndex: "assingned",
      render: (item, record) => record?.doctor?.name ? <div>Dr.{record?.doctor?.name}</div> : <div>unasigned</div>,
      // sorter: (a, b) => a.assingned.length - b.assingned.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (item) => (
        <div
         
        >
          <StatusBadge status={item}/>
        </div>
      ),
    },
  ];

  return (
    <div className="card-box mt-4">
      <h4>Recent Booking Requests</h4>
      <DataTable columns={columns} dataSource={recentBookings ?? []} loading={isLoading}/>
    </div>
  );
}

export default BookingsTable;
