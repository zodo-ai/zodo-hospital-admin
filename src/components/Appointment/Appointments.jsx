import { useState } from "react";
import TransparentTabs from "../tabs/TransparentTabs";
import AppointmentTable from "./AppointmentTable";
import { useAuth } from "../../hooks/useAuth";
import { useHospitalAppointments } from "../../hooks/appointments/useHospitalAppointments";
import { generateDateQuery } from "../configs/generateDateQuery";

function Appointments() {
  const { hospitalId } = useAuth();
  const [dateQuery, setDatequery] = useState(null);
  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
  };
  const { data: appointmentList, isLoading } = useHospitalAppointments(
    hospitalId,
    dateQuery
  );

  const onGoing = appointmentList?.filter((item) => item.status === "accepted" || item.status === "started");
  const cancelled = appointmentList?.filter(
    (item) => item.status === "cancelled"
  );
  const completed = appointmentList?.filter(
    (item) => item.status === "completed"
  );
  // const completed =
  const appointmentDataTab = [
    {
      id: "allAppointments",
      title: "All",
      content: (
        <AppointmentTable
          appointmentList={appointmentList}
          loading={isLoading}
          handleDate={handleDate}
        />
      ),
      link: "all",
      mainTab: "appointment",
    },
    {
      id: "ongoing",
      title: "Ongoing",
      content: (
        <AppointmentTable
          appointmentList={onGoing}
          loading={isLoading}
          handleDate={handleDate}
        />
      ),
      link: "ongoing",
      mainTab: "appointment",
    },
    {
      id: "cancelled",
      title: "Cancelled",
      content: (
        <AppointmentTable
          appointmentList={cancelled}
          loading={isLoading}
          handleDate={handleDate}
        />
      ),
      link: "cancelled",
      mainTab: "appointment",
    },
    {
      id: "completed",
      title: "Completed",
      content: (
        <AppointmentTable
          appointmentList={completed}
          loading={isLoading}
          handleDate={handleDate}
        />
      ),
      link: "completed",
      mainTab: "appointment",
    },
  ];
  return (
    <div className="card-box mt-3">
      <TransparentTabs tabData={appointmentDataTab} />
    </div>
  );
}

export default Appointments;
