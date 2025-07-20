import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function CircularImage({ src, alt = "Profile", size = 150, fallback }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="rounded-circle overflow-hidden border"
      style={{
        width: size,
        height: size,
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {hasError ? (
        <img
          src={fallback}
          alt="Fallback"
          className="img-fluid"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="img-fluid"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </div>
  );
}

// props validation
CircularImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  size: PropTypes.number,
  fallback: PropTypes.string,
};
export default CircularImage;
