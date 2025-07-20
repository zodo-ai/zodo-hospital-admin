import PropTypes from "prop-types";
import React from "react";

function Prescription({ prescriptionUrl }) {
  return (
    <div>
      <iframe
        src={prescriptionUrl}
        width="100%"
        height="600px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
}

// props validation 
Prescription.propTypes = {
  prescriptionUrl: PropTypes.string,
};

export default Prescription;
