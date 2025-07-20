import PropTypes from 'prop-types';
import { useAuth } from '../../hooks/useAuth';
import { useViewHospital } from '../../hooks/hospital/useViewHospital';
import { useMutation } from '@tanstack/react-query';
import { exportHospitalSettlements } from '../../apis/settlement';
import { toast } from 'react-toastify';
import { exporticon } from '../imagepath';
import { Link } from 'react-router-dom';

function ExportHospitalSettlements() {
    const { hospitalId } = useAuth();
  const { data: hospital } = useViewHospital(hospitalId);
  const hospitalName = hospital?.name ?? "";

  const exportMutation = useMutation({
    mutationFn: () => exportHospitalSettlements(hospitalId),
    onSuccess: (data) => {
      if (!data || !(data instanceof Blob)) {
        toast.error("Failed to export data - invalid response format");
        return;
      }

      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${hospitalName}_settlements_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Settlements exported successfully!");
    },
    onError: (error) => {
      console.error("Export failed:", error);
      toast.error("Failed to export settlements. Please try again.");
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
  )
}

ExportHospitalSettlements.propTypes = {
  query: PropTypes.string,
};

export default ExportHospitalSettlements