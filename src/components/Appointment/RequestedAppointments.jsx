import { useState } from "react";
import DataTable from "../Tables/DataTable";
import ScheduleModal from "../modals/Schedule/ScheduleModal";
import { Link } from "react-router-dom";
import { formatDate } from "../configs/formatDate";
import { useHospitalAppointments } from "../../hooks/appointments/useHospitalAppointments";
import { useAuth } from "../../hooks/useAuth";
import DateSearchHero from "../heros/DateSearchHero";
import { generateDateQuery } from "../configs/generateDateQuery";
function RequestedAppointments() {
  const { hospitalId } = useAuth();
  const [dateQuery, setDatequery] = useState(null);
  const { data: appointmentsList, isLoading } = useHospitalAppointments(
    hospitalId,
    dateQuery
  );

  const requestedList =
    appointmentsList &&
    appointmentsList?.filter((item) => item.timeSlot === null);

  const [show, setShow] = useState(false);
  const [requestDetails, setRequestDetails] = useState({});

  const handleSchedule = (record) => {
    setRequestDetails(record);
    setShow(true);
  };

  const columns = [
    {
      title: "Booking ID",
      dataIndex: "booking_id",
    },
    {
      title: "Patient Name",
      dataIndex: "",
      render: (item, record) => (
        <div>{record?.user_details?.name ?? record?.user?.first_name}</div>
      ),
    },
    
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "ASSIGNED DOCTOR",
      dataIndex: "",
      render: (item, record) =>
        record?.doctor?.name ? (
          <div>{record?.doctor?.name}</div>
        ) : (
          <div>unassigned</div>
        ),
    },
    {
      title: "PHONE NUMBER",
      dataIndex: "contactinfo",
      render: (item, record) => <div>{record?.user?.phone}</div>,
    },
    {
      title: "INITIATED DATE & TIME",
      dataIndex: "createdAt",
      render: (item) => <div>{formatDate(item)}</div>,
      sorter: (a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      },
    },
    {
      title: <div className="text-center">ACTION</div>,
      dataIndex: "",
      render: (item, record) =>
        record?.type === "fast_tag" ? (
          <div className="text-center">N/A</div>
        ) : (
          <div className="d-flex justify-content-center">
            <Link
              to="?tab=requested"
              className="hospital-add-btn rounded-pill ms-md-1 text-white schedule-btn"
              onClick={() => handleSchedule(record)}
            >
              Schedule Now
            </Link>
          </div>
        ),
    },
  ];

  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
  };
  return (
    <div className="card-box mt-3">
      <DateSearchHero handleDate={handleDate} type="hospital-bookings" />

      <DataTable
        columns={columns}
        dataSource={requestedList || []}
        loading={isLoading}
      />
      <ScheduleModal
        show={show}
        setShow={setShow}
        requestDetails={requestDetails}
      />
    </div>
  );
}

export default RequestedAppointments;
