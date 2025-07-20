import PropTypes from "prop-types";
import { useState } from "react";
import ConsultationAppointment from "./ConsultationAppointment";
import ServiceAppointment from "./ServiceAppointment";

function CreateAppointment({ handleClose }) {

  const [bookingType, setBookingType] = useState("consultation");

  return (
    // <FormProvider {...methods}>
      <div
        className="bg-white rounded ps-1 pe-1"
        // onSubmit={methods.handleSubmit(onCreateAppointment)}
      >
        <div className="row mt-3">
          <div className="col-md-6">
            <div className="form-group">
              <h4 className="booking-title mt-2">Booking Type</h4>
              <div className="d-flex gap-4 mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bookingType"
                    value="consultation"
                    checked={bookingType === "consultation"}
                    onChange={() => setBookingType("consultation")}
                    id="consultationRadio"
                  />
                  <label
                    className="form-check-label fw-bolder"
                    htmlFor="consultationRadio"
                  >
                    Consultation
                  </label>
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="bookingType"
                    value="service"
                    checked={bookingType === "service"}
                    onChange={() => setBookingType("service")}
                    id="serviceRadio"
                  />
                  <label
                    className="form-check-label fw-bolder"
                    htmlFor="serviceRadio"
                  >
                    Service Booking
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookingType === "consultation" && <ConsultationAppointment handleClose={handleClose}/>}
        {bookingType === "service" && <ServiceAppointment handleClose={handleClose}/>}
      </div>
    // </FormProvider>
  );
}

CreateAppointment.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CreateAppointment;
