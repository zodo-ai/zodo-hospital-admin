import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CountUp from "react-countup";
import RequestPayment from "../modals/RequestPayment/RequestPayment";

function SettlementCard(props) {
  const { info } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div className="row">
      {info.map((item) => {
        return (
          <div
            // to={item.link}
            className="col-md-3 col-sm-3 col-lg-4 col-xl-4"
            key={item.id + item.title}
          >
            <div className="dash-widget">
              <div className="dash-boxs comman-flex-center">
                <img src={item.icon} alt="#" />
              </div>
              <div className="dash-content dash-count flex-grow-1">
                <h4>{item.title}</h4>
                {item?.type !== "paymentrequest" ? (
                  <h2>
                    {item?.type === "currency" && "₹"}
                    <CountUp delay={0.4} end={item.count} duration={0.6} />
                  </h2>
                ) : (
                  <div className="pb-4 pt-2">
                    <Link className="hospital-add-btn rounded-pill ms-1 text-white ps-4 pe-4 pt-2 pb-2" onClick={()=>setShow(true)}>
                      Request Payment
                    </Link>
                  </div>
                )}
                {/* <p>
                  <span className="passive-view">
                    <i className="feather-arrow-up-right me-1">
                      <FeatherIcon icon="arrow-up-right" />
                    </i>
                    {item.percentageUp}%
                  </span>{" "}
                  vs last month
                </p> */}
              </div>
            </div>
          </div>
        );
      })}
      <RequestPayment
        setShow={setShow}
        show={show}
        title="Request For Payment"
        handleClose={handleClose}
      />
    </div>
  );
}

SettlementCard.propTypes = {
  info: PropTypes.node,
};

export default SettlementCard;
