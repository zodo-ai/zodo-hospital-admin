import CountUp from "react-countup";
import PropTypes from "prop-types";

function InfoCards(props) {
  const { info } = props;
  return (
    <div className="row">
      {info.map((item) => {
        return (
          <div
            to={item.link}
            className="col-md-3 col-sm-3 col-lg-4 col-xl-4 info-card-link"
            key={item.id + item.title}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
            }}
          >
            <div className="dash-widget">
              <div className="dash-boxs comman-flex-center">
                <img src={item.icon} alt="#" />
              </div>
              <div className="dash-content dash-count flex-grow-1">
                <h4>{item.title}</h4>
                {item.type !== "fasttag" ? (
                  <h2>
                    {item.type === "currency" && (
                      <span className="currency-symbol">₹</span>
                    )}{" "}
                    <CountUp delay={0.4} end={item.count} duration={0.6} />
                  </h2>
                ) : (
                  <div className="fasttag-toggle">
                    <h6>{item.count ? <span className="text-primary fasttag-status">Active</span>: <div className="text-secondary fasttag-status">Disabled</div>}</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

InfoCards.propTypes = {
  info: PropTypes.node,
};
export default InfoCards;
