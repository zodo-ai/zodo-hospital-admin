import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import RequestedAppointments from "../../Appointment/RequestedAppointments";
import AppointmentFasttags from "../../Appointment/AppointmentFasttags";
import Appointments from "../../Appointment/Appointments";
import AppointmentButtonTab from "../../tabs/AppointmentButtonTab";
import SideModal from "../../modals/SideModal";
import { useState } from "react";
import CreateAppointment from "../../Appointment/CreateAppointment";
function Appointment() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const appointmentTab = [
    {
      id: "appointment",
      title: "Appoinment",
      content: (
        <Appointments/>
      ),
      link: "appointment",
    },
    {
      id: "requested",
      title: "Requested",
      content: (
        <RequestedAppointments/>
      ),
      link: "requested",
    },
    {
      id: "fasttag",
      title: "Fast Tag",
      content: <AppointmentFasttags />,
      link: "fasttag",
    },
  ];

  const breadCrumpData = [
    {
      name: "Appointment",
      status: "active",
      link: "/appointment",
    },
  ];

  return (
    <Layout activeClassName="appointment" id="menu-item2" id1="menu-items2">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <AppointmentButtonTab
            tabData={appointmentTab}
            handleShow={handleShow}
          />
          <SideModal
            show={show}
            handleClose={handleClose}
            title="Add Appointment"
          >
            <CreateAppointment handleClose={handleClose} />
          </SideModal>
        </div>
      </div>
    </Layout>
  );
}

export default Appointment;
