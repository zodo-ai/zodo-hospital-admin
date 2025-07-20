import PropTypes from "prop-types";
import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

function AppointmentButtonTab(props) {
  const { tabData, handleShow } = props;
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") || tabData[0]?.link;
  return (
    <div>
      <div className="d-md-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mt-3 bg-white tabs-list">
          {tabData.map((item, i) => (
            <li
              className="nav-item bg-white rounded-pill p-2"
              key={item.id + i}
            >
              <Link
                className={`nav-link ${tab === item.link ? "active" : ""}`}
                to={`?tab=${item.link}`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn-primary me-1 rounded-pill pt-2 pb-2 text-white pe-3 ps-3 mt-md-0 mt-3"
          onClick={()=> handleShow()}
        >
          <FeatherIcon icon="plus" />
          Add Appointment
        </button>
      </div>
      <div className="tab-content">
        {tabData.map((item) => (
          <div
            className={`tab-pane ${tab === item.link ? "show active" : ""}`}
            id={`${item.id}`}
            key={item.id}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
}
AppointmentButtonTab.propTypes = {
  tabData: PropTypes.array,
  handleShow: PropTypes.func,
};
export default AppointmentButtonTab;
