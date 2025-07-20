import React from "react";
import { Link } from "react-router-dom";

function LoadMore() {
  return (
    <div className="col-lg-12 pb-3">
      <div className="invoice-load-btn">
        <Link to="#" className="btn">
          <span className="spinner-border text-primary" /> Load more
        </Link>
      </div>
    </div>
  );
}

export default LoadMore;
