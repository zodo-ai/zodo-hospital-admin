import PropTypes from "prop-types";
import { Link, useSearchParams } from "react-router-dom";

function FinanceTabs(props) {
  const { tabData } = props;
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'payout'  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-rounded mt-3 bg-white tabs-list">
          {tabData.map((item, i) => (
            <li
              className="nav-item bg-white rounded-pill p-2"
              key={item.id + i}
            >
              <Link
                className={`nav-link ${tab === item.link ? "active" : ""}`}
                to={`?tab=${item.link}`}
                // data-bs-toggle="tab"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        {/* <Link className="nav-item bg-primary rounded-pill p-2 text-white">hi</Link> */}
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
    </>
  );
}

// validate props
FinanceTabs.propTypes = {
  tabData: PropTypes.node,
};

export default FinanceTabs;
