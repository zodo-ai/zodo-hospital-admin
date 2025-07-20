import React from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";

function Closebtn() {
    const navigate = useNavigate();
  return (
    <Link to className="x-btn text-secondary" onClick={()=> navigate(-1)}>
      <i className="feather-x">
        <FeatherIcon icon="x" />
      </i>
    </Link>
  );
}

export default Closebtn;
