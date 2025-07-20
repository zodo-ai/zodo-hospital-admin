import React, { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addicon } from "../imagepath";

function ButtonSerchHero(props) {
  const { title, handleSearchterm, handleShow, buttonTitle } = props;
  //   const [show, setShow] = useState(false);
  const [searchTerm, setSearchterm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  useEffect(() => {
    handleSearchterm(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleSearchInput = (searchTerm) => {
    setSearchterm(searchTerm);
  };
  return (
    <div className="page-header invoices-page-header">
      <div className="d-flex flex-column flex-md-row">
        <div className="w-md-50 w-100 d-flex align-items-md-center flex-column flex-md-row">
          <div className="search-hero-header w-25">
            <h3>{title}</h3>
          </div>
          <div className="ms-md-3 w-md-50 w-100">
            <div>
              <div className="form-group has-search">
                <span className="fa fa-search form-control-feedback"></span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(e) => handleSearchInput(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-md-50 w-100 d-flex align-items-md-center justify-content-end flex-column flex-md-row">
          <div className="">
            <div className="invoices-create-btn d-flex justify-content-md-end">
              <Link
                to
                className="hospital-add-btn rounded-pill ms-1 text-white ps-4 pe-4 pt-2 pb-2"
                onClick={() => handleShow()}
              >
                <img src={addicon} alt="add" />
                <span className="ms-2 me-2">{buttonTitle}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ButtonSerchHero.propTypes = {
  handleSearchterm: PropTypes.func,
  title: PropTypes.string,
  handleShow: PropTypes.bool,
  buttonTitle: PropTypes.string,
};

export default ButtonSerchHero;
