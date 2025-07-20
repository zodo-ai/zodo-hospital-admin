import React from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import { useParams } from "react-router-dom";
import { useValidateId } from "../../../hooks/useValidateId";
import { useViewStaff } from "../../../hooks/staff/useViewStaff";
import StaffView from "../../Staffs/StaffView";

function StaffDetails() {
  const { id } = useParams();
  const { validId } = useValidateId(id);
  const { data: staff, isLoading } = useViewStaff(validId);
  console.log(isLoading)    
  
  const breadCrumpData = [
    {
      name: "Staff",
      status: "inactive",
      link: "/staff-manage",
    },
    {
      name: staff?.first_name,
      status: "active",
      link: `/staff-manage/`,
    },
  ];
  return (
    <Layout activeClassName="staff-manage" id="menu-item5" id1="menu-items5">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <StaffView staffDetails={staff}/>
        </div>
      </div>
    </Layout>
  );
}

export default StaffDetails;
