import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function ModalTabs(props) {
  const { tabData } = props;

  return (
    <>
      <div className="profile-tabs">
        <ul className="nav nav-tabs nav-tabs-bottom">
          {tabData.map((tabItem, i) => (
            <li key={tabItem.id + i}>
              <Link
                className={`nav-link ${i === 0 ? "active" : ""}`}
                to={`#${tabItem.id}`}
                // to={`?tab=${tabItem.mainTab}&innertab=${tabItem.link}`}
                data-bs-toggle="tab"
              >
                {tabItem.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="tab-content">
        {tabData.map((tabItem, i) => (
          <div
            className={`tab-pane ${i === 0 ? "show active" : ""}`}
            id={tabItem.id}
            key={tabItem.id + i}
          >
            {tabItem.content}
          </div>
        ))}
      </div>
    </>
  );
}

ModalTabs.propTypes = {
  tabData: PropTypes.node,
};

export default ModalTabs;
