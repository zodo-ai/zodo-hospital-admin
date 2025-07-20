import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import { useAuth } from "../../../hooks/useAuth";
import { useDepartmentList } from "../../../hooks/departments/useDepartmentList";
import Department from "../../Hospitals/Departments/Department";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import CenteredModal from "../../modals/CenteredModal";
import DepartmentForm from "../../modals/AddDepartment/DepartmentForm";
function Departments() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const query = searchTerm ? `name=${searchTerm}` : "";  
  const { hospitalId } = useAuth();
  const { data: departmentsList } = useDepartmentList(hospitalId, query);  
  const breadCrumpData = [
    {
      name: "Hospitals",
      status: "inactive",
      link: "/hospital/departments",
    },
    {
      name: "Departments",
      status: "active",
      link: "/hospital/departments",
    },
  ];
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };
  const handleShow = () => {
    setShow(true);
  };

  const handleCloseModal = () => {
    setShow(false);
  };

  return (
    <Layout
      activeClassName="hospital-departments"
      id="menu-item3"
      id1="menu-items3"
    >
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Departments" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Departments"
            handleSearchterm={handleSearch}
            buttonTitle="Add Department"
          />
          <Department departmentList={departmentsList ?? []} />
        </div>
      </div>
      <CenteredModal
        show={show}
        handleClose={handleCloseModal}
        title="Add Department"
      >
        <DepartmentForm handleClose={handleCloseModal} />
      </CenteredModal>
    </Layout>
  );
}

export default Departments;
