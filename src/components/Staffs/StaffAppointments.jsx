import PropTypes from "prop-types";
import { useState } from "react";
import CircularImage from "../assests/CircularImage";
import { user_profile } from "../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import StatusBadge from "../assests/StatusBadge";
import { useHospitalAppointments } from "../../hooks/appointments/useHospitalAppointments";
import { useAuth } from "../../hooks/useAuth";
import { generateDateQuery } from "../configs/generateDateQuery";
import ServiceAppointmentTable from "../Hospitals/Services/ServiceAppointmentTable";

function StaffAppointments({ staffDetails }) {
    const{hospitalId} = useAuth();
  const [dateQuery, setDatequery] = useState("");
  function renderSpecialisation(specialisationList) {
    const specialisationLen = specialisationList?.length;
    const specialisations =
      specialisationLen !== 0 &&
      specialisationList?.reduce((acc, current) => {
        return acc + current.name + " ";
      }, "");
    return <div>{specialisations}</div>;
  }

  const query = dateQuery ? `created_by=${staffDetails?.id}&${dateQuery}` : `created_by=${staffDetails?.id}` 
  const { data: appointmentList, isLoading } = useHospitalAppointments(
    hospitalId,
    query
  );

  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
    // setDate(date);
  };
  const exportQuery = staffDetails?.id ? `?created_by=${staffDetails?.id}` : ""
  return (
    <div>
      <div>
        <div className="d-md-flex justify-content-between align-items-center ms-2 me-2">
          <div className="d-flex align-items-center">
            <div className="schedule-profile">
              <CircularImage
                src={staffDetails?.profile_picture ?? user_profile}
                alt="user"
                size={80}
                fallback={user_profile}
              />
            </div>
            <div className="schedule-modal">
              <div className="d-flex">
                <h5>{staffDetails?.first_name}</h5>
              </div>
              <small>
                {staffDetails?.departments?.length > 0 && (
                  <span>
                    {renderSpecialisation(staffDetails?.departments)}
                  </span>
                )}
              </small>
              <div>
                {staffDetails?.user_type}
              </div>
            </div>
          </div>
          <div className="mt-md-0 mt-3">
            {staffDetails?.phone && (
              <div className="d-flex align-items-center">
                <i className="feather-facebook text-primary">
                  <FeatherIcon icon="phone" />
                </i>
                <h6 className="user-details ms-3 pt-2">
                  {staffDetails?.phone}
                </h6>
              </div>
            )}

            {staffDetails?.email && (
              <div className="d-flex align-items-center">
                <i className="feather-facebook text-primary">
                  <FeatherIcon icon="mail" />
                </i>
                <h6 className="user-details ms-3 pt-2">
                  {staffDetails?.email}
                </h6>
              </div>
            )}
          </div>

          <div className="mt-md-0 mt-3">
            <StatusBadge
              status={staffDetails?.is_active ? "active" : "inactive"}
            />
          </div>
        </div>
      </div>
      <div className="ms-2 me-2 mt-4">
        <h4>Appointments</h4>
        <ServiceAppointmentTable
          appointmentList={appointmentList}
          loading={isLoading}
          handleDate={handleDate}
          query={exportQuery}
        />
      </div>
    </div>
  );
}

StaffAppointments.propTypes = {
  staffDetails: PropTypes.object,
};

export default StaffAppointments;
