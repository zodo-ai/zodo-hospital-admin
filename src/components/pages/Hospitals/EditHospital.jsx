import React from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
// import UploadFiles from "../../Hospitals/UploadFiles";
// import FastTag from "../../Hospitals/FastTag";
// import ChooseFile from "../../Hospitals/ChooseFile";
// import Closebtn from "../../assests/Closebtn";
import EditHospitalForm from "../../Hospitals/EditHospitalForm";
function EditHospital() {
  const breadCrumpData = [
    {
      name: "Hospital",
      status: "inactive",
      link: "/hospital/edit",
    },
  ];
  
  return (
    <Layout activeClassName="edit-hospital" id="menu-item3" id1="menu-items3">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <EditHospitalForm/>
        </div>
      </div>
    </Layout>
  );
}

export default EditHospital;
