import { useState } from "react";
// import DepartmentHero from "../../heros/DepartmentHero";
import DepartmentCard from "./DepartmentCard";
import PropTypes from "prop-types";

function Department(props) {
  const { departmentList, loading } = props;
  const [activeDropdown, setActiveDropdown] = useState(null);

  if (loading) {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="text-muted mt-2">Loading departments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!Array.isArray(departmentList) || departmentList.length === 0) {
    return (
      <div>
        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="text-center">
              <div className="mb-3">
                <i className="fas fa-building" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
              </div>
              <h5 className="text-muted mb-2">No Departments Found</h5>
              <p className="text-muted">No hospital departments are available at the moment.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="row mt-3">
        {departmentList.map((item) => {
          return (
            <div
              className="col-md-3 col-sm-6 col-lg-3 col-xl-3"
              key={item.id}
              style={{ zIndex: activeDropdown === item.id ? 1050 : 1 }}
            >
              <div className="dash-widget">
                <DepartmentCard
                  data={item}
                  setActiveDropdown={setActiveDropdown}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
// props validation
Department.propTypes = {
  departmentList: PropTypes.array,
  loading: PropTypes.bool,
};
export default Department;
