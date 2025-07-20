import PropTypes from "prop-types";

function StatusBadge(props) {
  const { status } = props;
  const statusCheck = status?.toLowerCase();
  return (
    <div
      className={`custom-badge ${
        (statusCheck === "active" && "status-green") ||
        (statusCheck === "approved" && "status-green") ||
        (statusCheck === "paid fully" && "status-green") ||
        (statusCheck === "completed" && "status-green") ||
        (statusCheck === "disabled" && "status-grey") ||
        (statusCheck === "unavailable" && "status-grey") ||
        (statusCheck === "blocked" && "status-grey") ||
        (statusCheck === "inactive" && "status-grey") ||
        (statusCheck === "rejected" && "status-red") ||
        (statusCheck === "pending" && "status-orange") ||
        (statusCheck === "requested" && "status-orange") ||
        (statusCheck === "accepted" && "status-orange") ||
        (statusCheck === "started" && "status-orange")
      }`}
    >
      {status}
    </div>
  );
}
// props validation
StatusBadge.propTypes = {
  status: PropTypes.string,
};
export default StatusBadge;
