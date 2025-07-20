import React from "react";
import Layout from "../../layout/Layout";
import Breadcrumb from "../../breadcrump/Breadcrumb";
import DoctorDetailsCard from "../../Doctors/DoctorDetailsCard";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useDoctorsList } from "../../../hooks/doctors/useDoctorsList";

function DoctorDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const hospital_id = user?.hospital_id;

  const { data: doctorsList } = useDoctorsList(hospital_id);
  const doctorDetails = doctorsList?.find((doctor) => doctor.id === id);
  
  const breadCrumpData = [
    {
      name: "Doctors",
      status: "inactive",
      link: "/manage-doctors",
    },
    {
      name: id,
      status: "active",
      link: `/manage-doctors/${doctorDetails?.name}`,
    },
  ];
  return (
    <Layout activeClassName="doctor-manage" id="menu-item3" id1="menu-items3">
      <div className="page-wrapper">
        <div className="content">
          <Breadcrumb data={breadCrumpData} />
          <DoctorDetailsCard doctorId={doctorDetails?.id}/>
        </div>
      </div>
    </Layout>
  );
}

export default DoctorDetails;
