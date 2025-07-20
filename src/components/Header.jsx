/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baricon1, user_profile, mainLogo } from "./imagepath";
import { useAuth } from "../hooks/useAuth";
import { useViewHospital } from "../hooks/hospital/useViewHospital";
import ConfirmLogout from "./modals/ConfirmLogout";

const Header = () => {
  const { user, setUser, hospitalId, setHospitalId } = useAuth();
  const navigate = useNavigate();
  const userName = user?.first_name + user?.last_name || "User";
  const userRole = user?.user_type || "Role";
  const handlesidebar = () => {
    document.body.classList.toggle("mini-sidebar");
  };
  const handlesidebarmobilemenu = () => {
    document.body.classList.toggle("slide-nav");
    document.getElementsByTagName("html")[0].classList.toggle("menu-opened");
    document
      .getElementsByClassName("sidebar-overlay")[0]
      .classList.toggle("opened");
  };

  const openDrawer = () => {
    const div = document.querySelector(".main-wrapper");
    if (div?.className?.includes("open-msg-box")) {
      div?.classList?.remove("open-msg-box");
    } else {
      div?.classList?.add("open-msg-box");
    }
  };

  useEffect(() => {
    const handleClick = () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
    };

    const maximizeBtn = document.querySelector(".win-maximize");
    // maximizeBtn.addEventListener('click', handleClick);

    return () => {
      // maximizeBtn.removeEventListener('click', handleClick);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    sessionStorage.removeItem("token"); // Remove the token from session storage
    setUser(null); // Clear the user state
    setHospitalId(null);
    navigate("/login"); // Redirect to the login page
  };
  const [isOpen, setIsOpen] = useState(false);

  const { data: hospital } = useViewHospital(hospitalId);
  return (
    <div className="main-wrapper">
      <div className="header">
        <div className="header-left">
          <Link
            to={user?.user_type === "hsAdmin" ? "/" : "/appointment"}
            className="logo"
          >
            <img src={mainLogo} width={108} height={38} alt="" />{" "}
          </Link>
        </div>
        <Link
          id="mobile_btn"
          className="mobile_btn float-start"
          to="#"
          onClick={handlesidebarmobilemenu}
        >
          <img src={baricon1} alt="" />
        </Link>
        <ul className="nav user-menu float-end">
          <li className="nav-item dropdown has-arrow user-profile-list">
            <Link
              to="#"
              className="dropdown-toggle nav-link user-link"
              data-bs-toggle="dropdown"
            >
              <div className="user-names">
                <h5>{userName}</h5>
                <span>{userRole}</span>
              </div>
              <span className="user-img">
                <img src={user?.profile_picture || user_profile} alt="Admin" />
              </span>
            </Link>
            <div className="dropdown-menu">
              <Link className="dropdown-item">{hospital?.name}</Link>
              <Link
                className="dropdown-item"
                // to="/login"
                onClick={() => setIsOpen(true)}
              >
                Logout
              </Link>
            </div>
          </li>
        </ul>
        <div className="dropdown mobile-user-menu float-end">
          <Link
            to="#"
            className="dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-ellipsis-vertical" />
          </Link>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item">{hospital?.name}</Link>

            <Link className="dropdown-item" to onClick={() => setIsOpen(true)}>
              Logout
            </Link>
          </div>
        </div>
      </div>
      <ConfirmLogout
        show={isOpen}
        setShow={setIsOpen}
        handleLogout={handleLogout}
      />
    </div>
  );
};



export default Header;
