import PropTypes from "prop-types";
import React from "react";

function FasttagToggle(props) {
  const { index, setToggleFasttag, toggleFasttag } = props;
  return (
    <div className="status-toggle d-flex justify-content-between align-items-center">
      <input
        type="checkbox"
        id={`${index ? "status_" + index : "status_0"}`}
        className="check"
        onClick={() => setToggleFasttag(!toggleFasttag)}
        checked={toggleFasttag}
      />
      <label
        htmlFor={`${index ? "status_" + index : "status_0"}`}
        className="checktoggle"
      >
        checkbox
      </label>
    </div>
  );
}

FasttagToggle.propTypes = {
  index: PropTypes.node,
  setToggleFasttag: PropTypes.func,
  toggleFasttag: PropTypes.bool,
};

export default FasttagToggle;
