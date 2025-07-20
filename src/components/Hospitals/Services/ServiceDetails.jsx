import PropTypes from "prop-types";
import DescriptionBox from "../../assests/DescriptionBox";
import ImageBox from "../../assests/ImageBox";
import { useAuth } from "../../../hooks/useAuth";
import ServiceAppointmentTable from "./ServiceAppointmentTable";
import { useHospitalAppointments } from "../../../hooks/appointments/useHospitalAppointments";
import { useState } from "react";
import { generateDateQuery } from "../../configs/generateDateQuery";

function ServiceDetails({ data }) {
  const { hospitalId } = useAuth();
  const [dateQuery,setDateQuery] =useState("")
  const query = dateQuery ? `type=service&hospital_service_id=${data.id}&${dateQuery}` : `type=service&hospital_service_id=${data.id}`
  const {data: appointmentList, isLoading} = useHospitalAppointments(hospitalId, query);
  // const query =
  // const {} = useHospitalAppointments(hospitalId)
 
  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDateQuery(query);
  };
  
  const exportQuery = `?type=service&hospital_service_id=${data?.id}`
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-4 d-flex align-items-center justify-content-md-start justify-content-center">
            <ImageBox
              src={data?.image}
              alt="Service"
              width="150px"
              height="100%"
              className="service-banner"
            />
            <div className="service-details">
              <h6>{data.name}</h6>
              <p>{data?.hospital?.name} </p>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            <div className="main-balance">
              <p>Daily Bookings Count</p>
              <h4>{data?.daily_booking_count}</h4>
            </div>
          </div>
          <div className="col-md-4 d-flex align-items-center justify-content-md-end justify-content-center">
            <div className="settlement-card mt-2">
              <div className="settlemet-details">
                <p>Price</p>
                <h4>₹ {data?.price ?? 0}</h4>
              </div>
              <div className="settlemet-details ms-5">
                <p>Discounted Price</p>
                <h4 className="text-primary">
                  ₹ {data?.strike_through_price ?? 0}
                </h4>
              </div>
            </div>
          </div>
        </div>

        {data?.description && (
          <div className="ps-3 pe-3 mt-3 mb-3">
            <h6 className="description-header">About</h6>
            <DescriptionBox text={data?.description} />
          </div>
        )}

        <div className="ms-2 me-2 mt-4">
          <h4>Service Appointments</h4>
          <ServiceAppointmentTable
            appointmentList={appointmentList}
            loading={isLoading}
            handleDate={handleDate}
            query={exportQuery}
          />
        </div>
      </div>
    </div>
  );
}

// props validation
ServiceDetails.propTypes = {
  data: PropTypes.object,
};

export default ServiceDetails;
