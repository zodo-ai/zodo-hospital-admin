// import AppointmentTable from "../Appointment/AppointmentTable";
import DataTable from "../Tables/DataTable";
import { useAuth } from "../../hooks/useAuth";
import DateSearchHero from "../heros/DateSearchHero";
import { useState } from "react";
import StatusBadge from "../assests/StatusBadge";
import { generateDateQuery } from "../configs/generateDateQuery";
import { formatToDate } from "../configs/formatToDate";
import { message, Tooltip } from "antd";
import { Clipboard } from "react-feather";
import { useHospitalTransactions } from "../../hooks/settlements/useHospitalTransactions";
function History() {
  const { hospitalId } = useAuth();
  const [dateQuery, setDatequery] = useState("");

  const { data: settlements, isLoading } = useHospitalTransactions(
    hospitalId,
    dateQuery
  );
  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
    // setdate(date);
  };

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "order_id",
      // sorter: (a, b) => a.bookingid.length - b.bookingid.length,
      render: (text) =>
        text ? (
          <div className="d-flex align-items-center gap-2">
            <span
              style={{
                maxWidth: 120,
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={text}
            >
              {text?.slice(0, 16)}...
            </span>
            <Tooltip title="Copy Order ID">
              <Clipboard
                size={16}
                style={{ cursor: "pointer", color: "#347D73" }}
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  message.success("Copied to clipboard");
                }}
              />
            </Tooltip>
          </div>
        ) : (
          <div>N/A</div>
        ),
    },
    {
      title: "INITATED BY",
      dataIndex: "",
      render: (item, record) => (
        <div className="d-flex align-items-center">
          {record?.user?.first_name || "N/A"}
        </div>
      ),
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
    },
    {
      title: "TYPE",
      dataIndex: "type",
      render: (item) => <div>{item || "N/A"}</div>,
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
      filters: [
        { text: "consultation", value: "consultation" },
        { text: "service", value: "service" },
        { text: "fast_tag", value: "fast_tag" },
      ],
      onFilter: (value, record) => record.type.startsWith(value),
      filterSearch: true,
    },
    {
      title: <div className="text-center">Payment mode</div>,
      dataIndex: "payment_type",
      // sorter: (a, b) => a.type.length - b.type.length,
      render: (item) => (
        <div className="text-center">{item ? item : "unknown"}</div>
      ),
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      render: (item) => <div>₹{item}</div>,
      sorter: (a, b) => a.amount - b.amount,
      // render: (item) => <div>₹ {item}</div>,
    },
    {
      title: "SETTLEMENT DATE",
      dataIndex: "updated_at",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (item) => <div>{formatToDate(item)}</div>,
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "completed", value: "completed" },
        { text: "pending", value: "pending" },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
      render: (item) => (
        <div>
          <StatusBadge status={item} />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div>
        <DateSearchHero handleDate={handleDate} type="transaction" />
        <DataTable
          columns={columns}
          dataSource={settlements ? settlements : []}
          loading={isLoading}
        />
      </div>
      {/* <AppointmentTable appointmentList={appointmentList}/> */}
    </div>
  );
}

export default History;
