import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useHospitalSettlements } from "../../hooks/settlements/useHospitalSettlements";
import DateSearchHero from "../heros/DateSearchHero";
import { generateDateQuery } from "../configs/generateDateQuery";
import DataTable from "../Tables/DataTable";
import StatusBadge from "../assests/StatusBadge";
import { formatToDate } from "../configs/formatToDate";

function Settlements() {
  const { hospitalId } = useAuth();
  const [dateQuery, setDatequery] = useState("");

  const { data: settlements, isLoading } = useHospitalSettlements(
    hospitalId,
    `&${dateQuery}`
  );
  const handleDate = (date) => {
    const query = generateDateQuery(date);
    setDatequery(query);
    // setdate(date);
  };
  const columns = [
    {
      title: "INITIATED BY",
      dataIndex: "",
      render: (item, record) => (
        <div className="d-flex align-items-center">
          {record?.user?.first_name || "N/A"}
        </div>
      ),
      // sorter: (a, b) => a.patientname.length - b.patientname.length,
    },
    {
      title: "AMOUNT",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
      render: (item) => <div>₹{item || "N/A"}</div>,
    },
    {
      title: <div className="text-center">PAYMENT MODE</div>,
      dataIndex: "payment_type",
      // sorter: (a, b) => a.type.length - b.type.length,
      render: (item) => (
        <div className="text-center">{item ? item : "unknown"}</div>
      ),
    },
    {
      title: "REQUEST DATE",
      dataIndex: "request_date",
      // sorter: (a, b) => a.time.length - b.time.length,
      render: (item) => <div>{formatToDate(item)}</div>,
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "STATUS",
      dataIndex: "status",
      filters: [
        { text: "completed", value: "completed" },
        { text: "requested", value: "requested" },
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
        <DateSearchHero handleDate={handleDate} type="settlement" />
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

export default Settlements;
