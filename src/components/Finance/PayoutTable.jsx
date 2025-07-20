import { message, Tooltip } from "antd";
import { useHospitalTransactions } from "../../hooks/settlements/useHospitalTransactions";
import DataTable from "../Tables/DataTable";
import { Clipboard } from "react-feather";
import StatusBadge from "../assests/StatusBadge";
import { useAuth } from "../../hooks/useAuth";
import { formatToDate } from "../configs/formatToDate";

function PayoutTable() {
  const { hospitalId } = useAuth();
  const query = "limit=5";

  const { data: payouts, isLoading } = useHospitalTransactions(
    hospitalId,
    query
  );
  const columns = [
    {
      title: "Order ID",
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
      title: "Initiated by",
      dataIndex: "",
      render: (item, record) => (
        <div className="d-flex align-items-center">
          {record?.user?.first_name || "N/A"}
        </div>
      ),
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (item) => <div>{item || "N/A"}</div>,
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
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
      title: "Amount",
      dataIndex: "amount",
      render: (item) => <div>₹{item}</div>,
      // sorter: (a, b) => a.type.length - b.type.length,
      // render: (item) => <div>₹ {item}</div>,
    },
    {
      title: "Settlement Date",
      dataIndex: "updated_at",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (item) => <div>{formatToDate(item)}</div>,
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: <div className="text-center">Status</div>,
      dataIndex: "status",
      // sorter: (a, b) => a.status.length - b.status.length,
      render: (item) => (
        <div className="d-flex justify-content-center">
          <StatusBadge status={item} />
        </div>
      ),
    },
  ];
  return (
    <div className="card-box mt-4">
      <h4>Recent Payout Requests</h4>
      <DataTable
        columns={columns}
        dataSource={payouts ?? []}
        loading={isLoading}
      />
    </div>
  );
}

export default PayoutTable;
