import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

function ImageBox(props) {
  const { src, alt, width = "100%", height = "200px", className } = props;
  const [hasError, setHasError] = useState(false);
  return (
    <div
      className={`d-flex align-items-center justify-content-center ${className}`}
      style={{ width, height, backgroundColor: "#f8f9fa", overflow: "hidden" }}
    >
      {hasError || !src ? (
        <div className="text-muted text-center text-sm p-2 image-placeholder">
          <p>No image available</p>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className="img-fluid w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      )}
    </div>
  );
}

// props validation
ImageBox.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  className: PropTypes.string,
};

export default ImageBox;
