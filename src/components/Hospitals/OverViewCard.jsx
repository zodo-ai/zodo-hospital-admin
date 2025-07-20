import PropTypes from "prop-types";
import React from "react";
import { right_chevron } from "../imagepath";

function OverViewCard(props) {
  const { varient, data } = props;
  return (
    <div className={varient}>
      <div className="dash-widget h-75">
        <div className="dash-content dash-count flex-grow-1">
          <h6 className={`text-black ${data.status ? "" : "pt-3"}`}>{data.amount}</h6>
          <p>
            <span className="passive-view">{data.status}</span>
          </p>
          <div className="row">
            <p className="text-dark mt-2 col">{data.operation}</p>
            <div className="col-auto">
              <img src={right_chevron} alt="#" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

OverViewCard.propTypes = {
  varient: PropTypes.node,
  data: PropTypes.node,
};

export default OverViewCard;
