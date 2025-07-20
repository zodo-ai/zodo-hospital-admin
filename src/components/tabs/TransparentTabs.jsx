import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

function TransparentTabs(props) {
  const { tabData } = props;
  const [searchParams] = useSearchParams();
  const tabs = searchParams.get("tab") || tabData[0]?.mainTab;
  const innerTab = searchParams.get("innertab") || tabData[0]?.link;
  return (
    <>
      <div className="profile-tabs">
        <ul className="nav nav-tabs nav-tabs-bottom">
          {tabData.map((tabItem, i) => (
            <li key={tabItem.id + i}>
              <Link
                className={`nav-link ${tabs === tabItem.mainTab && innerTab === tabItem.link ? "active" : ""}`}
                // to={`#${tabItem.id}`}
                to={`?tab=${tabItem.mainTab}&innertab=${tabItem.link}`}
                // data-bs-toggle="tab"
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
            className={`tab-pane ${tabs === tabItem.mainTab && innerTab === tabItem.link ? "show active" : ""}`}
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

TransparentTabs.propTypes = {
  tabData: PropTypes.node,
};

export default TransparentTabs;
