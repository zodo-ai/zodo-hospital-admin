import React from "react";
import ServiceCard from "./ServiceCard";
import PropTypes from "prop-types";

function ServicesList(props) {
  const { servicesData, isLoading } = props;
  
  if (isLoading) {
    return (
      <div>
        <div className="row mt-3">
          <div
            className="col-12 d-flex justify-content-center align-items-center"
            style={{ minHeight: "400px" }}
          >
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading specialisations...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(servicesData) || servicesData.length === 0) {
    return (
      <div className="row mt-3">
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="text-center">
            <div className="mb-3">
              <i
                className="fas fa-hospital-alt"
                style={{ fontSize: "4rem", color: "#6c757d" }}
              ></i>
            </div>
            <h5 className="text-muted mb-2">No Services Found</h5>
            <p className="text-muted">
              No hospital services are available at the moment.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row mt-3">
      {servicesData.map((item) => (
        <div className="col-sm-6 col-lg-4 col-xl-4 d-flex" key={item.id}>
          <ServiceCard servicesData={item} />
        </div>
      ))}
    </div>
  );
}

// props validation
ServicesList.propTypes = {
  servicesData: PropTypes.array,
  isLoading: PropTypes.bool,
};
export default ServicesList;
