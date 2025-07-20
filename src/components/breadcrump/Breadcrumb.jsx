import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import PropTypes from "prop-types";

function Breadcrumb(props) {
  const { data } = props;
  return (
    <>
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <ul className="breadcrumb">
              {data?.map((item) => (
                <>
                  <li className={`breadcrumb-item ${item.status === "active" ? 'active' : ''}`}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                  {item.status !== "active" && (
                    <li className="breadcrumb-item text-secondary">
                      <i className="feather-chevron-right breadcrump-chervron">
                        <FeatherIcon icon="chevron-right" />
                      </i>
                    </li>
                  )}
                </>
              ))}
              {/* <li className="breadcrumb-item active">Admin Dashboard</li> */}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

Breadcrumb.propTypes = {
  data: PropTypes.node,
};
export default Breadcrumb;
