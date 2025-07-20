import React from "react";
import { exporticon } from "../imagepath";
import { Link } from "react-router-dom";

function ExportTable() {
  return (
    <div className="form-group local-forms">
      <Link to className="outlined-btn form-control">
        <img src={exporticon} alt="" />
        <span className="ms-2 me-2 text-primary">Export</span>
      </Link>
    </div>
  );
}

export default ExportTable;
