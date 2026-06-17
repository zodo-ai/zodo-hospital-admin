import { useState } from "react";
import DataTable from "./DataTable";
import PropTypes from "prop-types";
import { formatToDate } from "../configs/formatToDate";
import StatusBadge from "../assests/StatusBadge";
import { Link } from "react-router-dom";
import SideModal from "../modals/SideModal";
import EditBanner from "../modals/Banners/EditBanner";

function BannersTable({ bannersList, isLoading }) {
  const [showEdit, setShowEdit] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleEditClick = (record) => {
    setSelectedBanner(record);
    setShowEdit(true);
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <img
          src={image || "https://via.placeholder.com/150"}
          alt="banner"
          style={{ width: "80px", height: "40px", objectFit: "cover", borderRadius: "4px" }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Subtitle",
      dataIndex: "subtitle",
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
        dataSource={bannersList || []}
        loading={isLoading}
      />
      <SideModal
        show={showEdit}
        handleClose={() => setShowEdit(false)}
        title="Edit Banner"
      >
        <EditBanner handleClose={() => setShowEdit(false)} bannerDetails={selectedBanner} />
      </SideModal>
    </div>
  );
}

BannersTable.propTypes = {
  bannersList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default BannersTable;
