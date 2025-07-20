import React from "react";
import ServiceCard from "./ServiceCard";
import PropTypes from "prop-types";
function ServicesList(props) {
  const { servicesData } = props;
  return (
    <div className="row mt-3">
      {Array.isArray(servicesData) && servicesData.map((item) => (
        <div className="col-sm-6 col-lg-4 col-xl-4 d-flex" key={item.id}>
          <ServiceCard servicesData={item} />
        </div>
      ))}
    </div>
  );
}


// props validation
ServicesList.propTypes = {
  servicesData: PropTypes.node,
};
export default ServicesList;
