import React from "react";
import OverViewCard from "../../Hospitals/OverViewCard";
import { DatePicker } from "antd";
import TransactionTable from "../../Hospitals/Transactions/TransactionTable";
import ExportTable from "../../assests/ExportTable";

function DoctorsOverview() {
  const revenueOverview = [
    {
      id: 1,
      amount: "$ 20,000",
      status: "No Dues",
      operation: "Settlement",
    },
    {
      id: 2,
      amount: "$ 20,000",
      status: "No Dues",
      operation: "Total C",
    },
    {
      id: 3,
      amount: "$ 2000",
      status: "No Dues",
      operation: "Total Balance",
    },
  ];
  return (
    <div>
      <div className="row pt-2">
        {revenueOverview.map((item) => (
          <OverViewCard
            varient="col-md-4 col-sm-6 col-lg-4 col-xl-4"
            data={item}
            key={item.id}
          />
        ))}
      </div>

      <div className="card-box overview-card">
        <h5 className="text-black">Transactions</h5>
        <div className="row mt-4">
          <div className="col-12 col-md-6 col-xl-3">
            <div className="form-group local-forms cal-icon">
              <DatePicker
                className="form-control datetimepicker"
                // onChange={onChange}
                suffixIcon={null}
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <div className="form-group local-forms">
              <input
                type="text"
                className="form-control"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-md-6 col-xl-3">
            <ExportTable/>
            
          </div>
        </div>
        <div>
          <h5 className="text-black">{232} results found</h5>
        </div>

        <div className="table-responsive">
          <TransactionTable />
        </div>
      </div>
    </div>
  );
}

export default DoctorsOverview;
