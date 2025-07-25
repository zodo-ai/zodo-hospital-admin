import { useEffect, useState } from "react";
import DataTable from "./DataTable";
import { user_profile } from "../imagepath";
import { Link } from "react-router-dom";
import ConfirmDelete from "../modals/ConfirmDelete";
import PropTypes from "prop-types";
import EditDoctor from "../modals/AddDoctor/EditDoctor";
import { useAuth } from "../../hooks/useAuth";
import { useDoctorsList } from "../../hooks/doctors/useDoctorsList";
import CircularImage from "../assests/CircularImage";
import { formatToDate } from "../configs/formatToDate";
import StatusBadge from "../assests/StatusBadge";
import SideModal from "../modals/SideModal";
import DoctorAppointments from "../Doctors/DoctorsBookings/DoctorAppointments";
import { Tag } from "antd";
import { useChangeDoctorStatus } from "../../hooks/doctors/useChangeDoctorStatus";
import ToggleModal from "../modals/ToggleModal";

function DoctorsTable(props) {
  const { doctorsList, loading } = props;
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showView, setShowView] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const { hospitalId } = useAuth();
  const { data: doctorsData } = useDoctorsList(hospitalId);
  const [disable, setdisable] = useState(false);
  const [status, setStatus] = useState("");
  // const { mutate, isLoading } = useDeleteDoctor();
  const { mutate, isLoading: statusChangeLoading } = useChangeDoctorStatus();

  const [doctorDetails, setDoctorDetails] = useState({});
  useEffect(() => {
    if (doctorsData) {
      setShow(false);
    }
  }, [doctorsData]);

  const handleEdit = (id) => {
    setShowEdit(true);
    setSelectedDoctor(id);
  };

  const handleView = (record) => {
    // setSelectedDoctor(id);
    setDoctorDetails(record);
    setShowView(true);
  };

  const handleTogglebtn = (id, status) => {
    setSelectedDoctor(id);
    setShow(true);
    setStatus(status);
  };

  const handleDelete = async () => {    
    const data = {
      status: status === "active" ? "disabled" : "active",
    };
    await mutate({ id: selectedDoctor, data: data });
  };

  const handleClose = () => {
    setShowView(false);
  };
  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (item, record) => (
        <div className="d-flex">
          <div>
            <CircularImage
              src={record?.profile_pic ?? user_profile}
              alt={record.name}
              size={40}
              fallback={user_profile}
            />
          </div>
          <div className="ms-2 table-profile">
            <h6>{record.name}</h6>
            <p className="text-muted mb-0">{record.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
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
      title: "Pricing",
      dataIndex: "pricing",
      // sorter: (a, b) => a.pricing.length - b.pricing.length,
      sorter: (a, b) => {
        return a.pricing - b.pricing;
      },
      render: (item) => <div>₹{item}</div>,
    },
    {
      title: "Joining Date",
      dataIndex: "work_start_date",
      render: (item) => <div>{item ? formatToDate(item) : "N/A"}</div>,
      sorter: (a, b) => {
        return new Date(a.work_start_date) - new Date(b.work_start_date);
      },
      // sorter: (a, b) => a.joiningDate.length - b.joiningDate.length,
    },
    {
      title: "Status",
      dataIndex: "status",
      // sorter: (a, b) => a.pricing.length - b.pricing.length,
      render: (item) => <StatusBadge status={item} />,
      filters: [
        { text: "active", value: "active" },
        { text: "disabled", value: "disabled" },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      title: "",
      dataIndex: "FIELD8",
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
                  // to={`${record.id}`}
                  onClick={() => handleView(record)}
                >
                  <i className="far fa-eye me-2" />
                  View
                </Link>
                <Link
                  className="dropdown-item"
                  to
                  onClick={() => handleEdit(record.id)}
                >
                  <i className="far fa-edit me-2" />
                  Edit
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => handleTogglebtn(record.id, record.status)}
                >
                  <div
                    // onClick={handleTogglebtn}
                    className="status-toggle d-flex align-items-center"
                  >
                    <input
                      type="checkbox"
                      id="status"
                      className="check"
                      checked={record?.status === "active" ? true : false}
                    />
                    <label htmlFor="status" className="checktoggle-small">
                      checkbox
                    </label>
                    <span className="ps-2">
                      {record?.status === "active" ? "Disable" : "Enable"}
                    </span>
                  </div>
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
        dataSource={doctorsList ?? []}
        loading={loading}
      />
      <ConfirmDelete
        setShow={setShow}
        show={show}
        title="Doctor"
        handleDelete={handleDelete}
        isLoading={statusChangeLoading}
      />
      <EditDoctor
        setShow={setShowEdit}
        show={showEdit}
        title="Edit Doctor"
        selectedDoctor={selectedDoctor}
      />

      <SideModal
        show={showView}
        handleClose={handleClose}
        title="Doctor Details"
      >
        <DoctorAppointments doctorDetails={doctorDetails} />
      </SideModal>

      <ToggleModal
        show={show}
        setShow={setShow}
        setdisable={setdisable}
        disable={disable}
        title="Doctor"
        handleDisable={handleDelete}
        isLoading={statusChangeLoading}
      />
    </div>
  );
}

// props validation
DoctorsTable.propTypes = {
  doctorsList: PropTypes.node,
  loading: PropTypes.bool,
};
export default DoctorsTable;
