import Layout from "../../layout/Layout";
import Hero from "../../Dashboard/hero";
// import InfoCards from "../../Dashboard/Info_cards";
// import { fasttag, profile_hospitals, doctors } from "../../imagepath";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import AppointmentInfo from "../../Dashboard/AppointmentInfo";
import FastTag from "../../Dashboard/FastTag";
import HospitalStaf from "../../Dashboard/HospitalStaf";
import ButtonTabs from "../../tabs/ButtonTabs";
import { useHospitalAnalytics } from "../../../hooks/hospital/useHospitalAnalytics";
import { useAuth } from "../../../hooks/useAuth";
import FullscreenLoader from "../../loaders/FullscreenLoader";
// import { useViewHospital } from "../../../hooks/hospital/useViewHospital";
function Dashboard() {
  const { hospitalId } = useAuth();
  const { data: hospitalAnalytics, isLoading } =
    useHospitalAnalytics(hospitalId);
  
  const breadCrumpData = [
    {
      name: "Dashboard",
      status: "active",
      link: "/",
    },
  ];

  const dashboardTab = [
    {
      id: "appointment",
      title: "Appointment",
      content: <AppointmentInfo data={hospitalAnalytics?.booking || {}} />,
      link: "appointment",
    },
    {
      id: "hospitalstaff",
      title: "Hospital Staff",
      content: <HospitalStaf data={hospitalAnalytics?.user_counts || {}} />,
      link: "staff",
    },
    {
      id: "fasttag",
      title: "Fasttag",
      content: <FastTag data={hospitalAnalytics?.fast_tag || {}} />,
      link: "fasttag",
    }
  ];

  return (
    <Layout activeClassName="">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <Hero />
          <ButtonTabs tabData={dashboardTab} />
          {isLoading && <FullscreenLoader />}
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
