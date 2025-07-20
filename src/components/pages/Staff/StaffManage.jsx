import { useState } from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import BasicHero from "../../heros/BasicHero";
import StaffTable from "../../Tables/StaffTable";
import ButtonSerchHero from "../../heros/ButtonSerchHero";
import { useHospitalStaffs } from "../../../hooks/users/useHospitalStaffs";
import { useAuth } from "../../../hooks/useAuth";
import SideModal from "../../modals/SideModal";
import CreateStaff from "../../modals/AddStaff/CreateStaff";

function StaffManage() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { hospitalId } = useAuth();
  const handleShow = () => {
    setShow(true);
  };
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const breadCrumpData = [
    {
      name: "Staff",
      status: "active",
      link: "/staff-manage",
    },
  ];
  const query = searchTerm ? `name=${searchTerm}` : "";
  const { data: staffsList, isLoading } = useHospitalStaffs(hospitalId, query);
  const handleCloseModal = () => {
    setShow(false);
  };
  return (
    <Layout activeClassName="staff-manage" id="menu-item5" id1="menu-items5">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <BasicHero title="Staff Details" />
          <ButtonSerchHero
            handleShow={handleShow}
            title="All Staffs"
            handleSearchterm={handleSearch}
            buttonTitle="Add Staff"
          />
          <StaffTable staffsList={staffsList} isLoading={isLoading} />
        </div>
      </div>
      <SideModal show={show} handleClose={handleCloseModal} title="Add Staff">
        <CreateStaff handleClose={handleCloseModal} />
      </SideModal>
    </Layout>
  );
}

export default StaffManage;
