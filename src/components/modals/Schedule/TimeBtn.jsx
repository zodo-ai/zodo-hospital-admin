import PropTypes from "prop-types";
import React from "react";
import { Button } from "react-bootstrap";

function TimeBtn(props) {
  const { time } = props;
  return <Button className="time-btn">{time}</Button>;
}

TimeBtn.propTypes = {
  time: PropTypes.node,
};

export default TimeBtn;
