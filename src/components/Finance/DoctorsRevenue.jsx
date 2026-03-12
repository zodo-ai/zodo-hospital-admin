import { useState } from "react";
import DateSearchHero from "../heros/DateSearchHero";
import DataTable from "../Tables/DataTable";
import { useDoctorsRevenue } from "../../hooks/doctors/useDoctorsRevenue";

function DoctorsRevenue() {

  const [dateQuery, setDateQuery] = useState("");

  const { data: doctors, isLoading } = useDoctorsRevenue(dateQuery);

  const handleDate = (date) => {
  if (!date || date.length !== 2) return;

  const start = date[0].toISOString();
  const end = date[1].toISOString();

  setDateQuery(`startTime=${start}&endTime=${end}`);
};

  const columns = [
    {
      title: "DOCTOR",
      dataIndex: "doctor_name",
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>
            {record?.doctor_name || "N/A"}
          </div>

          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            {record?.doctor_email}
          </div>

          <div style={{ fontSize: "13px", color: "#6b7280" }}>
            {record?.doctor_phone}
          </div>

          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            {record?.specialisation?.join(", ")}
          </div>
        </div>
      ),
    },
    {
      title: "REVENUE",
      dataIndex: "total_revenue",
      render: (item) => <div>₹{item}</div>,
    },
    {
      title: "NO OF BOOKINGS",
      dataIndex: "total_bookings",
    },
    {
      title: "NO OF PATIENTS",
      dataIndex: "total_patients",
    },
  ];

  return (
    <div>
      <DateSearchHero handleDate={handleDate} type="revenue" />

      <DataTable
        columns={columns}
        dataSource={doctors || []}
        loading={isLoading}
      />
    </div>
  );
}

export default DoctorsRevenue;