import FasttagTable from "../Appointment/FasttagTable";
import { appointmentList } from "./appointmentList";
const fasttagAppointments = appointmentList?.filter((item)=> item.type === "Fast Tag");
const ongoingAppointments = fasttagAppointments?.filter((item)=> item.status === "Pending");
// const cancelledAppointments = appointmentList.filter((item)=> item.status === "Cancelled");
const completedAppointments = fasttagAppointments?.filter((item)=> item.status === "Completed");
export const appointmentRequestTab = [
  {
    id: "allFasttagAppointments",
    title: "All",
    content: <FasttagTable appointmentList={fasttagAppointments} />,
  },
  {
    id: "ongoingFasttags",
    title: "Ongoing",
    content: <FasttagTable appointmentList={ongoingAppointments} />,
  },
//   {
//     id: "cancelled",
//     title: "Cancelled",
//     content: <AppointmentTable appointmentList={cancelledAppointments} />,
//   },
  {
    id: "completedFasttags",
    title: "Completed",
    content: <FasttagTable appointmentList={completedAppointments} />,
  },
];
