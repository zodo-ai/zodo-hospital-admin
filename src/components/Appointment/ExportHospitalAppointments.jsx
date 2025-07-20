import { Link } from "react-router-dom";
import { exporticon } from "../imagepath";
import { useAuth } from "../../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { exportHospitalBookings } from "../../apis/appointments";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { useViewHospital } from "../../hooks/hospital/useViewHospital";

function ExportHospitalAppointments({ query }) {
  const { hospitalId } = useAuth();
  const { data: hospital } = useViewHospital(hospitalId);
  const hospitalName = hospital?.name ?? "";
  const exportMutation = useMutation({
    mutationFn: () => exportHospitalBookings(hospitalId, query),
    onSuccess: (data) => {
      if (!data || !(data instanceof Blob)) {
        toast.error("Failed to export data - invalid response format");
        return;
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${hospitalName}_appointments_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Appointments exported successfully!");
    },
    onError: (error) => {
      console.error("Export failed:", error);
      toast.error("Failed to export appointments. Please try again.");
    },
  });

  const handleDownload = () => {
    exportMutation.mutate();
  };

  return (
    <div className="form-group local-forms">
      <Link
        to="#"
        className="outlined-btn form-control"
        onClick={(e) => {
          e.preventDefault();
          handleDownload();
        }}
        style={{
          opacity: exportMutation.isPending ? 0.6 : 1,
          pointerEvents: exportMutation.isPending ? "none" : "auto",
        }}
      >
        <img src={exporticon} alt="" />
        <span className="ms-2 me-2 text-primary">
          {exportMutation.isPending ? "Exporting..." : "Export"}
        </span>
      </Link>
    </div>
  );
}

// validate props
ExportHospitalAppointments.propTypes = {
  query: PropTypes.string,
};

export default ExportHospitalAppointments;
