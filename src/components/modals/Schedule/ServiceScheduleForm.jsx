import PropTypes from "prop-types";
import ImageBox from "../../assests/ImageBox";
import { useViewService } from "../../../hooks/hospital-services/useViewService";
import DescriptionBox from "../../assests/DescriptionBox";
import ServiceTimeSlot from "./ServiceTimeSlot";

function ServiceScheduleForm({ handleTime, requestDetails }) {
  
  const serviceId = requestDetails?.hospital_service_id ?? "";
  const { data: service, isLoading } = useViewService(serviceId);
  console.log("Service", service, isLoading);

  return (
    <div>
      {/* <div className="row"> */}
      <div className="d-md-flex align-items-center justify-content-start">
        <ImageBox
          src={service?.image}
          alt="Service"
          width="150px"
          height="100%"
          className="service-banner border"
        />
      <div className="service-schedule-details ms-3">
        <h4>{service?.name}</h4>
         <div className="service-schedule-details-price mt-2">
              <h6 className="pt-1">Price </h6> <span className="price" >₹ {service?.price ?? 0}</span>
          </div>
          <div className="service-schedule-details-price">
              <h6 className="pt-1">Discounted </h6> <span className="price text-primary">₹ {service?.price ?? 0}</span>
          </div>
      </div>
      </div>

      {requestDetails?.reason && (
        <div className="ps-3 pe-3 mt-4 mb-3 ">
          <h4 className="card-title mt-2">Reason</h4>
          <div>
            <DescriptionBox text={requestDetails?.reason} />
          </div>
        </div>
      )}
      <h4 className="card-title mt-5">Available Time SLot</h4>

      <ServiceTimeSlot handleTime={handleTime}/>
      
    </div>
  );
}

ServiceScheduleForm.propTypes = {
  handleTime: PropTypes.func,
  requestDetails: PropTypes.object,
};

export default ServiceScheduleForm;
