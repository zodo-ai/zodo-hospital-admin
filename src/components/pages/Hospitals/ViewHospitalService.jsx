import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import { useParams } from "react-router-dom";
import { useViewService } from "../../../hooks/hospital-services/useViewService";
import BasicHero from "../../heros/BasicHero";
import ServicesTable from "../../Hospitals/Services/ServicesTable";

function ViewHospitalService() {
  const { id } = useParams();
  const { data: service } = useViewService(id);  
  
  const breadCrumpData = [
    {
      name: "Hospitals",
      status: "inactive",
      link: "/hospital/services",
    },
    {
      name: "Services",
      status: "inactive",
      link: "/hospital/services",
    },
    {
      name: service?.name,
      status: "active",
      link: `/hospital/services/${id}`,
    },
  ];
  return (
    <Layout
      activeClassName="hospital-services"
      id="menu-item3"
      id1="menu-items3"
    >
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title={service?.name} />
          <ServicesTable selectedService={service?.id}/>
          {/* <ServiceDetails serviceDetails={service ?? {}}/> */}
        </div>
      </div>
    </Layout>
  );
}

export default ViewHospitalService;
