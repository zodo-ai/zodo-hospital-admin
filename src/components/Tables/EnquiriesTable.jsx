import React from "react";
import DataTable from "./DataTable";
import PropTypes from "prop-types";
import { formatToDate } from "../configs/formatToDate";
import { Tag } from "antd";

function EnquiriesTable({ enquiriesList, isLoading }) {
  const columns = [
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      render: (item) => (
        <div className="d-flex">
          <div className="ms-2 table-profile">
            <h6>{item || "N/A"}</h6>
          </div>
        </div>
      ),
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Message",
      dataIndex: "message",
      render: (text) => (
        <div style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={text}>
          {text}
        </div>
      )
    },
    {
      title: "Enquiry Date",
      dataIndex: "enquiry_date",
      render: (item) => <div>{item ? formatToDate(item) : "N/A"}</div>,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "pending", value: "pending" },
        { text: "resolved", value: "resolved" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <div>
          <Tag color={status === 'pending' ? 'orange' : status === 'resolved' ? 'green' : 'default'}>
            {(status || '').toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      render: (item) => <div>{item ? formatToDate(item) : "N/A"}</div>,
    },
  ];

  return (
    <div className="mt-3">
      <DataTable
        columns={columns}
        dataSource={enquiriesList || []}
        loading={isLoading}
      />
    </div>
  );
}

EnquiriesTable.propTypes = {
  enquiriesList: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default EnquiriesTable;
