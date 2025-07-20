import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const DescriptionBox = ({ text }) => {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const el = descriptionRef.current;
    if (!el) return;

    const checkOverflow = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight;
      setShowButton(isOverflowing);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [text]);

  const toggleExpand = () => setExpanded((prev) => !prev);

  return (
    <div>
      <div
        className={`description-box ${expanded ? "expanded" : ""}`}
        ref={descriptionRef}
      >
        <p className="mb-0">{text}</p>
      </div>
      {showButton && (
        <button
          className="btn btn-link p-0 text-primary"
          onClick={toggleExpand}
          style={{ fontSize: "0.9rem" }}
        >
          {expanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};
DescriptionBox.propTypes = {
  text: PropTypes.string.isRequired,
};

export default DescriptionBox;
