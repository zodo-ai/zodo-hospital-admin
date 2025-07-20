import { useState } from "react";
import ConfirmDelete from "../modals/ConfirmDelete";
import EditStaff from "../modals/AddStaff/EditStaff";
import { user_profile } from "../imagepath";
import DataTable from "./DataTable";
import { useAuth } from "../../hooks/useAuth";
// import { useHospitalStaffs } from "../../hooks/users/useHospitalStaffs";
import { Link } from "react-router-dom";
import useDeleteStaff from "../../hooks/staff/useDeleteStaff";
import PropTypes from "prop-types";
import CircularImage from "../assests/CircularImage";
import { formatToDate } from "../configs/formatToDate";
import SideModal from "../modals/SideModal";
import StaffAppointments from "../Staffs/StaffAppointments";
import { Tag } from "antd";
import StatusBadge from "../assests/StatusBadge";
function StaffTable(props) {
  const { staffsList, isLoading } = props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [staffDetails, setStaffDetails] = useState({});
  const [userType, setUserType] = useState("");
  const { user } = useAuth();
  const [showView, setShowView] = useState(false);
  // const { data: staffsList, isLoading } = useHospitalStaffs(hospitalId);
  const { mutate, isLoading: deleteLoading } = useDeleteStaff();
  const filteredStafflist = staffsList
    ? staffsList.filter((item) => item.email !== user.email)
    : [];

  const handleEditClick = (id, user_type) => {
    setUserType(user_type);
    setSelectedStaff(id);
    setShowEdit(true);
  };

  const handleView = (record) => {
    setStaffDetails(record);
    setShowView(true);
  };

  const handleClose = () => {
    setShowView(false);
  };

  const handleDeleteClick = (id) => {
    setSelectedStaff(id);
    setShow(true);
  };
  const handleDelete = async () => {
    await mutate(selectedStaff);
    setShow(false);
  };
  const columns = [
    {
      title: "Staff Name",
      dataIndex: "first_name",
      // sorter: (a, b) => a.name.length - b.name.length,
      render: (item, record) => (
        <div className="d-flex">
          <div>
            <CircularImage
              src={record?.profile_picture ?? user_profile}
              alt={item}
              size={40}
              fallback={user_profile}
            />
          </div>
          <div className="ms-2 table-profile">
            <h6>{item}</h6>
            <p className="text-muted mb-0">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      // sorter: (a, b) => a.empid.length - b.empid.length,
    },

    {
      title: "Joining Date",
      dataIndex: "created_at",
      render: (item) => <div>{formatToDate(item)}</div>,
      // render:(item, record)=>{
      //   const date = record?.created_at;
      //   const dateOnly = new Date(date).toLocaleDateString();
      //   return (
      //     <div>{dateOnly}</div>
      //   )
      // }
      // sorter: (a, b) => a.joiningDate.length - b.joiningDate.length,
    },
    {
      title: "Departments",
      dataIndex: "departments",
      key: "departments",
      render: (departments) => (
        <div className="d-flex flex-wrap gap-2" style={{ maxWidth: "200px" }}>
          {departments?.map((dept) => (
            <Tag key={dept.id} color="cyan">
              {dept.name}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "user_type",
      // sorter: (a, b) => a.pricing.length - b.pricing.length,
    },
    {
          title: <div className="text-center">Status</div>,
          dataIndex: "is_active",
          // sorter: (a, b) => a.status.length - b.status.length,
          render: (status) => (
            <div className="d-flex justify-content-center">
              <StatusBadge status={status ? "active":"inactive"} />
            </div>
          ),
        },
    {
      title: "",
      dataIndex: "",
      render: (item, record) => (
        <>
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
                  to
                  onClick={() => handleView(record)}
                >
                  <i className="far fa-eye me-2" />
                  View
                </Link>
                <Link
                  className="dropdown-item"
                  to
                  onClick={() => handleEditClick(record.id, record.user_type)}
                >
                  <i className="far fa-edit me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => handleDeleteClick(record.id)}
                >
                  <i className="fa fa-trash-alt m-r-5"></i> Delete
                </Link>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
  return (
    <div className="mt-3">
      <DataTable
        columns={columns}
        dataSource={filteredStafflist}
        loading={isLoading}
      />
      <ConfirmDelete
        setShow={setShow}
        show={show}
        title="Staff"
        handleDelete={handleDelete}
        isLoading={deleteLoading}
      />
      <EditStaff
        setShow={setShowEdit}
        show={showEdit}
        title="Edit Staff"
        selectedStaff={selectedStaff}
        userType={userType}
      />
      <SideModal
        show={showView}
        handleClose={handleClose}
        title="Staff Details"
      >
        <StaffAppointments staffDetails={staffDetails}/>
      </SideModal>
    </div>
  );
}

StaffTable.propTypes = {
  staffsList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default StaffTable;
