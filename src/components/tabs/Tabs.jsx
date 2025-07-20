import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

function Tabs(props) {
  const { tabData } = props;
  return (
    <>
      <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mt-3 bg-white tabs-list">
        {tabData.map((item, i) => (
          <li className="nav-item bg-white rounded-pill p-2" key={item.id + i}>
            <Link
              className={`nav-link ${i === 0 ? "active" : ""}`}
              to={`#${item.id}`}
              data-bs-toggle="tab"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabData.map((item,i) => (
          <div
            className={`tab-pane ${i === 0 ? "show active" : ""}`}
            id={`${item.id}`}
            key={item.id}
          >
            {item.content}
          </div>
        ))}
      </div>
    </>
  );
}

Tabs.propTypes = {
  tabData: PropTypes.node,
};

export default Tabs;
