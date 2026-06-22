import { useState } from "react";
import DataTable from "./DataTable";
import PropTypes from "prop-types";
import { formatToDate } from "../configs/formatToDate";
import StatusBadge from "../assests/StatusBadge";
import { Link } from "react-router-dom";
import SideModal from "../modals/SideModal";
import EditTestimonial from "../modals/Testimonials/EditTestimonial";

function TestimonialsTable({ testimonialsList, isLoading }) {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const handleEditClick = (record) => {
    setSelectedTestimonial(record);
    setShowEdit(true);
  };

  const columns = [
    {
      title: "Patient",
      dataIndex: "patient_name",
      render: (text, record) => (
        <div className="d-flex align-items-center">
          <img
            src={record.patient_image || "https://via.placeholder.com/150"}
            alt="patient"
            style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "50%", marginRight: "10px" }}
          />
          <div>
            <div className="fw-bold">{record.patient_name}</div>
            <div className="text-muted small">{record.designation}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Order",
      dataIndex: "order",
    },
    {
      title: "Status",
      dataIndex: "is_active",
      render: (status) => (
        <StatusBadge status={status ? "active" : "inactive"} />
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (item) => <div>{item ? formatToDate(item) : "N/A"}</div>,
    },
    {
      title: "",
      dataIndex: "",
      render: (item, record) => (
        <div className="text-end">
          <div className="dropdown dropdown-action">
            <Link
              to="#"
              className="action-icon dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="fas fa-ellipsis-v" />
            </Link>
            <div className="dropdown-menu dropdown-menu-end">
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => handleEditClick(record)}
              >
                <i className="far fa-edit me-2" />
                Edit
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <DataTable
        columns={columns}
        dataSource={testimonialsList || []}
        loading={isLoading}
      />
      <SideModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        title="Edit Testimonial"
      >
        <EditTestimonial handleClose={() => setShowEdit(false)} testimonialDetails={selectedTestimonial} />
      </SideModal>
    </div>
  );
}

TestimonialsTable.propTypes = {
  testimonialsList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default TestimonialsTable;
