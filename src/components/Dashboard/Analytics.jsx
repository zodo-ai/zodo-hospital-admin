import React, { useEffect, useState } from "react";
import Select from "react-select";
import PatientChart from "./PaitentChart";
import PropTypes from "prop-types";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useAuth } from "../../hooks/useAuth";
function Analytics(props) {
  const { bookingType, id } = props;
  const { hospitalId } = useAuth();
  const [query,setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState(
    bookingType ? bookingType[0] : []
  );
  
  useEffect(() => {
    setQuery(`type=${selectedOption?.value}`)
  }, [selectedOption])
  
  
  const { data } = useAnalyticsData(hospitalId, query);
  
  const count = data && data?.reduce((acc, item) => acc + (item.count || 0), 0);

  return (
    <div className="card-box">
      <div className="row">
        <div className="col-12 col-md-12 col-lg-6 col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="chart-title patient-visit">
                <h4>Analytics</h4>
                <div>
                  <h6>
                    Total bookings{" "}
                    <span className="analytics-count">{count}</span>
                  </h6>
                </div>
                <div className="form-group mb-0">
                  <Select
                    className="custom-react-select"
                    defaultValue={selectedOption}
                    onChange={(option)=>setSelectedOption(option)}
                    options={bookingType}
                    id="search-commodity"
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused
                          ? "none"
                          : "2px solid rgba(46, 55, 164, 0.1);",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px #05A95C"
                          : "none",
                        "&:hover": {
                          borderColor: state.isFocused
                            ? "none"
                            : "2px solid rgba(46, 55, 164, 0.1)",
                        },
                        borderRadius: "10px",
                        fontSize: "14px",
                        minHeight: "45px",
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isSelected
                          ? "#347D73"
                          : provided.backgroundColor,
                        "&:active": {
                          backgroundColor: state.isSelected
                            ? "#347D73"
                            : provided.backgroundColor,
                        },
                      }),
                      dropdownIndicator: (base, state) => ({
                        ...base,
                        transform: state.selectProps.menuIsOpen
                          ? "rotate(-180deg)"
                          : "rotate(0)",
                        transition: "250ms",
                        width: "35px",
                        height: "35px",
                      }),
                    }}
                  />
                </div>
              </div>
              <div id={id} />
              <PatientChart data={data || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Analytics.propTypes = {
  bookingType: PropTypes.node,
  id: PropTypes.node,
};
export default Analytics;
