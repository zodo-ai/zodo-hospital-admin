import React, { useState } from "react";
// import DepartmentHero from "../../heros/DepartmentHero";
import DepartmentCard from "./DepartmentCard";
import PropTypes from "prop-types";

function Department(props) {
  const { departmentList } = props;
  const [activeDropdown, setActiveDropdown] = useState(null);
  return (
    <div>
      {/* <DepartmentHero /> */}
      <div className="row mt-3">
        {departmentList?.map((item) => {
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
};
export default Department;
