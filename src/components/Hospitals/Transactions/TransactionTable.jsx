import { Table } from "antd";
import React, { useState } from "react";
import { hospitalTransactions } from "../../configs/hospitalTransactions";
import { itemRender, onShowSizeChange } from "../../Pagination";
import PropTypes from "prop-types";
function TransactionTable(props) {
  const { bookings } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const columns = [
    {
      title: "DATE ISSUED",
      dataIndex: "createdAt",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "INVOICE#",
      dataIndex: "invoiceNumber",
      sorter: (a, b) => a.invoiceNumber.length - b.invoiceNumber.length,
    },
    {
      title: "TRANSACTION NAME",
      dataIndex: "transactionName",
      sorter: (a, b) => a.transactionName.length - b.transactionName.length,
    },
    {
      title: "DUE DATE",
      dataIndex: "appointmentDate",
      sorter: (a, b) => a.dueDate.length - b.dueDate.length,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      sorter: (a, b) => a.status.length - b.status.length,
      render: (item) => (
        <div
          className={`${
            (item === "Overdue" && "delete-badge status-red") ||
            (item === "started" && "delete-badge status-orange") ||
            (item === "Paid" && "delete-badge status-green")
          }`}
        >
          {item}
        </div>
      ),
    },
    {
      title: "TOTAL",
      dataIndex: "total",
      sorter: (a, b) => a.total.length - b.total.length,
    },
    {
      title: "BALANCE",
      dataIndex: "balance",
      sorter: (a, b) => a.balance.length - b.balance.length,
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  return (
    <div className="table-responsive">
      <Table
        pagination={{
          total: hospitalTransactions.length,
          showSizeChanger: true,
          // showTotal: (total, range) =>
          //   `Showing ${range[0]} to ${range[1]} of ${total} entries`,
          onShowSizeChange: onShowSizeChange,
          itemRender: itemRender,
        }}
        columns={columns}
        dataSource={bookings}
        rowSelection={rowSelection}
        rowKey={(record) => record.id}
      />
    </div>
  );
}

// props validation
TransactionTable.propTypes = {
  bookings: PropTypes.array.isRequired,
};

export default TransactionTable;
