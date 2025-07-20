import PropTypes from "prop-types";
import React from "react";

function SearchBox(props) {
  const { handleQuery } = props;
  return (
    <div>
      <div className="form-group has-search">
        <span className="fa fa-search form-control-feedback"></span>
        <input type="text" className="form-control" placeholder="Search" onChange={(e)=>handleQuery(e.target.value.toLocaleLowerCase())}/>
      </div>
    </div>
  );
}

//props validation
SearchBox.propTypes = {
  handleQuery: PropTypes.func,
};

export default SearchBox;
