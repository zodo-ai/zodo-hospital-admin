import { useState } from "react";
import DataTable from "./DataTable";
import PropTypes from "prop-types";
import { formatToDate } from "../configs/formatToDate";
import StatusBadge from "../assests/StatusBadge";
import { Link } from "react-router-dom";
import SideModal from "../modals/SideModal";
import EditGallery from "../modals/Gallery/EditGallery";

function GalleryTable({ galleryList, isLoading }) {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const handleEditClick = (record) => {
    setSelectedGallery(record);
    setShowEdit(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="gallery"
          style={{ width: "80px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
        />
      ),
    },
    {
      title: "Caption",
      dataIndex: "caption",
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
        dataSource={galleryList || []}
        loading={isLoading}
      />
      <SideModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        title="Edit Gallery"
      >
        <EditGallery handleClose={() => setShowEdit(false)} galleryDetails={selectedGallery} />
      </SideModal>
    </div>
  );
}

GalleryTable.propTypes = {
  galleryList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default GalleryTable;
