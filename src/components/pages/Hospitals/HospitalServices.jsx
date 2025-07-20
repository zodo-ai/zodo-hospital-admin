import { useState } from "react";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import Layout from "../../layout/Layout";
import BasicHero from "../../heros/BasicHero";
import ServicesList from "../../Hospitals/Services/ServicesList";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import { useAuth } from "../../../hooks/useAuth";
import { useHospitalServices } from "../../../hooks/hospital-services/useHospitalServices";
import CenteredModal from "../../modals/CenteredModal";
import AddServiceForm from "../../modals/AddService/AddServiceForm";

function HospitalServices() {
  const breadCrumpData = [
    {
      name: "Hospitals",
      status: "inactive",
      link: "/hospital/services",
    },
    {
      name: "Services",
      status: "active",
      link: "/hospital/services",
    },
  ];
  const [show, setShow] = useState(false);
  const { hospitalId } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const query = searchTerm ? `name=${searchTerm}` : "";
  
  const { data: servicesList } = useHospitalServices(hospitalId, query);
  const handleShow = () => {
    setShow(true);
  };
  
  const handleSearch = (searchTerm) => {
    
    setSearchTerm(searchTerm);
  };
  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Layout
      activeClassName="hospital-services"
      id="menu-item3"
      id1="menu-items3"
    >
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Services" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Services"
            handleSearchterm={handleSearch}
            buttonTitle="Add Service"
          />
          <ServicesList servicesData={servicesList} />
        </div>
      </div>
      <CenteredModal
        show={show}
        handleClose={handleCloseModal}
        title="Add Services"
      >
        <AddServiceForm handleClose={handleCloseModal} />
      </CenteredModal>
    </Layout>
  );
}

export default HospitalServices;
