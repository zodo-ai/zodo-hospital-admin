import React, { useState } from "react";
import { Link } from "react-router-dom";
import { appointmentRequets } from "../configs/appointmentRequests";
import ScheduleModal from "../modals/Schedule/ScheduleModal";
import DataTable from "../Tables/DataTable";

function RequestTable() {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");

  const handleSchedule = (record) => {
    const detail = {
      patientname: record.patientname,
      age: 24,
      gender: "Male",
      mobile: "+91 9837354565689",
    };
    setTitle(detail);
    setShow(true);
  };

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patientname",
      sorter: (a, b) => a.patientname.length - b.patientname.length,
    },
    {
      title: "Date & Time",
      dataIndex: "time",
      sorter: (a, b) => a.time.length - b.time.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      sorter: (a, b) => a.type.length - b.type.length,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   sorter: (a, b) => a.status.length - b.status.length,
    //   render: (item) => (
    //     <div
    //       className={`delete-badge ${
    //         (item === "Cancelled" && "status-red") ||
    //         (item === "Pending" && "status-orange") ||
    //         (item === "Completed" && "status-green")
    //       }`}
    //     >
    //       {item}
    //     </div>
    //   ),
    // },
    {
      title: "Department",
      dataIndex: "department",
      sorter: (a, b) => a.department.length - b.department.length,
    },
    {
      title: "Assigned Dr",
      dataIndex: "assingned",
      sorter: (a, b) => a.assingned.length - b.assingned.length,
    },
    {
      title: "Contact Info",
      dataIndex: "contactinfo",
      sorter: (a, b) => a.contactinfo.length - b.contactinfo.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (item, record) => (
        <Link
          to
          className="hospital-add-btn rounded-pill ms-md-1 text-white schedule-btn"
          // onClick={() => setShow(true)}
          onClick={() => handleSchedule(record)}
        >
          Schedule Now
        </Link>
      ),
    },
  ];
  return (
    <div className="card-box mt-3">
      <DataTable columns={columns} dataSource={appointmentRequets} />
      <ScheduleModal show={show} setShow={setShow} title={title}/>
    </div>
  );
}

export default RequestTable;
