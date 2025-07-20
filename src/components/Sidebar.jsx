/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  dashboard,
  logout_01,
  menuicon02,
  menuicon03,
  menuicon08,
  menuicon09,
  menuicon13,
  menuicon04,
  emptyWallet,
} from "./imagepath";
import Scrollbars from "react-custom-scrollbars-2";
import { useAuth } from "../hooks/useAuth";
import ConfirmLogout from "./modals/ConfirmLogout";

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const { user, setUser, setHospitalId } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const userRole = user?.user_type;
  const handleClick = (e, item, item1, item3) => {
    const div = document.querySelector(`#${item}`);
    const ulDiv = document.querySelector(`.${item1}`);
    if (ulDiv) {
      ulDiv.style.display === "block"
        ? (ulDiv.style.display = "none")
        : (ulDiv.style.display = "block");
      div.classList.contains("subdrop")
        ? div.classList.remove("subdrop")
        : div.classList.add("subdrop");
    }
  };

  useEffect(() => {
    if (props?.id && props?.id1) {
      const ele = document.getElementById(`${props?.id}`);
      handleClick(ele, props?.id, props?.id1);
    }
  }, []);

  const expandMenu = () => {
    document.body.classList.remove("expand-menu");
  };
  const expandMenuOpen = () => {
    document.body.classList.add("expand-menu");
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    sessionStorage.removeItem("token"); // Remove the token from session storage
    setUser(null); // Clear the user state
    setHospitalId(null);
    navigate("/login"); // Redirect to the login page
  };

  const handleMenuClick = () => {
    // This will remove mobile sidebar overlay & classes
    document.body.classList.remove("slide-nav");
    document.documentElement.classList.remove("menu-opened");

    const overlay = document.getElementsByClassName("sidebar-overlay")[0];
    if (overlay) overlay.classList.remove("opened");
  };

  return (
    <>
      <div className="sidebar" id="sidebar">
        <Scrollbars
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={0}
          autoHeightMax="95vh"
          thumbMinSize={30}
          universal={false}
          hideTracksWhenNotNeeded={true}
        >
          <div className="sidebar-inner slimscroll">
            <div
              id="sidebar-menu"
              className="sidebar-menu"
              onMouseLeave={expandMenu}
              onMouseOver={expandMenuOpen}
            > 
              <ul className="mt-5">
                {userRole === "hsAdmin" && (
                  <li className="submenu">
                    <Link
                      className={props?.activeClassName === "" ? "active" : ""}
                      id="menu-item"
                      to="/"
                      onClick={handleMenuClick}
                    >
                      <span className="menu-side">
                        <img src={dashboard} alt="" />
                      </span>{" "}
                      <span> Dashboard </span>
                      {/* <span className="menu-arrow" /> */}
                    </Link>
                  </li>
                )}

                <li className="submenu">
                  <Link
                    className={
                      props?.activeClassName === "appointment" ? "active" : ""
                    }
                    id="menu-item2"
                    to="/appointment"
                    onClick={handleMenuClick}
                  >
                    <span className="menu-side">
                      <img src={menuicon04} alt="" />
                    </span>{" "}
                    <span> Appointment </span>
                  </Link>
                </li>

                {userRole === "hsAdmin" && (
                  <li className="submenu">
                    <Link
                      className={
                        props?.activeClassName === "doctor-manage"
                          ? "active"
                          : ""
                      }
                      id="menu-item4"
                      to="/doctor-manage"
                      onClick={handleMenuClick}
                    >
                      <span className="menu-side">
                        <img src={menuicon02} alt="" />
                      </span>{" "}
                      <span> Doctor Manage </span>
                    </Link>
                  </li>
                )}

                {userRole === "hsAdmin" && (
                  <li className="submenu">
                    <Link
                      className={
                        props?.activeClassName === "staff-manage"
                          ? "active"
                          : ""
                      }
                      id="menu-item5"
                      to="/staff-manage"
                      onClick={handleMenuClick}
                    >
                      <span className="menu-side">
                        <img src={menuicon03} alt="" />
                      </span>{" "}
                      <span> Staff Manage </span>
                    </Link>
                  </li>
                )}

                {userRole === "hsAdmin" && (
                  <li className="submenu">
                    <Link
                      to
                      id="menu-item3"
                      onClick={(e) =>
                        handleClick(
                          e,
                          "menu-item3",
                          "menu-items3",
                          "menu-items3"
                        )
                      }
                      className={
                        props?.activeClassName === "hospital-services" ||
                        props?.activeClassName === "hospital-departments" ||
                        props?.activeClassName === "edit-hospital" ||
                        props?.activeClassName === "manage-doctors"
                          ? "active"
                          : ""
                      }
                    >
                      <span className="menu-side">
                        <img src={menuicon13} alt="" />
                      </span>{" "}
                      <span> Hospital </span> <span className="menu-arrow" />
                    </Link>
                    <ul style={{ display: "none" }} className="menu-items3">
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "hospital-services"
                              ? "submenu-active"
                              : "submenu-normal"
                          }
                          to="/hospital/services"
                          onClick={handleMenuClick}
                        >
                          Services
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "hospital-departments"
                              ? "submenu-active"
                              : "submenu-normal"
                          }
                          to="/hospital/departments"
                          onClick={handleMenuClick}
                        >
                          Department
                        </Link>
                      </li>
                      <li>
                        <Link
                          className={
                            props?.activeClassName === "edit-hospital"
                              ? "submenu-active"
                              : "submenu-normal"
                          }
                          // to="#"
                          to="/hospital/edit"
                          onClick={handleMenuClick}
                        >
                          Edit Hospital
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}

                {userRole === "hsAdmin" && (
                  <li className="submenu">
                    <Link
                      className={
                        props?.activeClassName === "finance" ? "active" : ""
                      }
                      id="menu-item4"
                      to="/finance"
                      onClick={handleMenuClick}
                    >
                      <span className="menu-side">
                        <img src={emptyWallet} alt="" />
                      </span>{" "}
                      <span> Finance </span>
                    </Link>
                  </li>
                )}
              </ul>
              <div className="logout-btn submenu">
                <Link
                  to
                  onClick={() => setIsOpen(true)}
                  className={
                    props?.activeClassName === "dashboard" ? "active" : ""
                  }
                >
                  <span className="menu-side">
                    <img src={logout_01} alt="" />
                  </span>{" "}
                  <span>Logout</span>
                </Link>
                <ConfirmLogout
                  show={isOpen}
                  setShow={setIsOpen}
                  handleLogout={handleLogout}
                />
              </div>
            </div>
          </div>
        </Scrollbars>
      </div>
    </>
  );
};
export default Sidebar;
