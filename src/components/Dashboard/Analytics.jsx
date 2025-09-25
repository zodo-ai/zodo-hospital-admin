import PatientChart from "./PaitentChart";
import PropTypes from "prop-types";
import { useAnalyticsData } from "../../hooks/useAnalyticsData";
import { useAuth } from "../../hooks/useAuth";
function Analytics(props) {
  const { id } = props;
  const { hospitalId } = useAuth();

  const { data } = useAnalyticsData(hospitalId);

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
