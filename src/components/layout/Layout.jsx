import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";
import PropTypes from "prop-types";
function Layout(props) {  
  return (
    <>
      <Header />
      <Sidebar
        id={props.id}
        id1={props.id1}
        activeClassName={props?.activeClassName}
      />
      <div>{props.children}</div>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  activeClassName:PropTypes.node,
  id:PropTypes.node,
  id1:PropTypes.node,

};

export default Layout;
