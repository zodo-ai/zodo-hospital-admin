import PropTypes from "prop-types";
import CircularImage from "../../assests/CircularImage";
import StatusBadge from "../../assests/StatusBadge";
import { user_profile } from "../../imagepath";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { useState } from "react";
import { useDoctorAppointments } from "../../../hooks/appointments/userDoctorAppointments";
import { generateDateQuery } from "../../configs/generateDateQuery";
import DoctorAppointmentTable from "../../Appointment/DoctorAppointmentTable";

function DoctorAppointments({ doctorDetails }) {
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
  const { data: appointmentList, isLoading } = useDoctorAppointments(
    doctorDetails.id,
    dateQuery
  );
  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
    // setDate(date);
  };

  return (
    <div>
      <div>
        <div className="d-md-flex justify-content-between align-items-center ms-2 me-2">
          <div className="d-flex align-items-center">
            <div className="schedule-profile">
              <CircularImage
                src={doctorDetails?.profile_pic ?? user_profile}
                alt="user"
                size={80}
                fallback={user_profile}
              />
            </div>
            <div className="schedule-modal">
              <div className="d-flex">
                <h5>{doctorDetails?.name}</h5>
              </div>
              <small>
                {doctorDetails?.specialisations?.length > 0 && (
                  <span>
                    {renderSpecialisation(doctorDetails?.specialisations)}
                  </span>
                )}
              </small>
              <div>
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa fa-star ${
                      index < parseInt(doctorDetails.total_rating)
                        ? "text-warning"
                        : ""
                    }`}
                  ></i>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-md-0 mt-3">
            {doctorDetails?.phone_number && (
              <div className="d-flex align-items-center">
                <i className="feather-facebook text-primary">
                  <FeatherIcon icon="phone" />
                </i>
                <h6 className="user-details ms-3 pt-2">
                  {doctorDetails?.phone_number}
                </h6>
              </div>
            )}

            {doctorDetails?.email && (
              <div className="d-flex align-items-center">
                <i className="feather-facebook text-primary">
                  <FeatherIcon icon="mail" />
                </i>
                <h6 className="user-details ms-3 pt-2">
                  {doctorDetails?.email}
                </h6>
              </div>
            )}
          </div>
            
          <div className="mt-md-0 mt-3">
            <StatusBadge
              status={doctorDetails?.status}
            />
          </div>
        </div>
      </div>
      <div className="ms-2 me-2 mt-4">
        <h4>Appointmentsss</h4>
        <DoctorAppointmentTable
          appointmentList={appointmentList}
          loading={isLoading}
          handleDate={handleDate}
          id={doctorDetails?.id}
        />
        
      </div>
    </div>
  );
}

DoctorAppointments.propTypes = {
  doctorDetails: PropTypes.object,
};

export default DoctorAppointments;
