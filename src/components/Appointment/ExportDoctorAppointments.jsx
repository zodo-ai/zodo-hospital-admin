import PropTypes from "prop-types";
import React from "react";
import { exportDoctotBookings } from "../../apis/appointments";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { exporticon } from "../imagepath";
import { useDoctorView } from "../../hooks/doctors/useDoctorView";

function ExportDoctorAppointments(props) {
  const { id: doctorId } = props;
  const { data: doctorDetails } = useDoctorView(doctorId);
  const exportMutation = useMutation({
    mutationFn: () => exportDoctotBookings(doctorId),
    onSuccess: (data) => {
      if (!data || !(data instanceof Blob)) {
        toast.error("Failed to export data - invalid response format");
        return;
      }
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `doctor_${
        doctorDetails.name +
        "_appointments_" +
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

ExportDoctorAppointments.propTypes = {
  id: PropTypes.string,
};

export default ExportDoctorAppointments;
