import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  arrow_left,
  bin_icon_red,
  cross_icon,
  dr_profile,
  email_icon,
  eye_icon,
  pdf_icon,
  pencil_icon,
  phone_icon,
  three_dots_menu,
} from "../imagepath";
import DoctorsOverview from "./DoctorsOverview/DoctorsOverview";
import DoctorsFinance from "./DoctorsFinance/DoctorsFinance";
import DoctorsBookings from "./DoctorsBookings/DoctorsBookings";
import ConfirmDelete from "../modals/ConfirmDelete";
import ToggleDisable from "../modals/ToggleDisable";
import PropTypes from "prop-types";
import { useDoctorView } from "../../hooks/doctors/useDoctorView";

function DoctorDetailsCard(props) {
  const { doctorId } = props;
  const { data } = useDoctorView(doctorId);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [disableshow, setdisableShow] = useState(false);
  const [disable, setdisable] = useState(false);
  const tabData = [
    { id: "dr_overview", title: "Overview", content: <DoctorsOverview /> },
    { id: "dr_finance", title: "Finance", content: <DoctorsFinance /> },
    {
      id: "dr_bookings",
      title: "Total Bookings",
      content: <DoctorsBookings doctorId={doctorId}/>,
    },
  ];

  const handleTogglebtn = (e) => {
    e.stopPropagation();
    setdisableShow(true);
  };
  return (
    <div>
      <div className="card-box profile-header mt-3">
        <div className="row">
          <div className="d-flex justify-content-between">
            <div className="basic-hero-header">
              <Link to onClick={() => navigate(-1)}>
                <img src={arrow_left} alt="" />
              </Link>
              <span className="ms-3">Doctor Details</span>
            </div>
            <div className="dropdown">
              <Link
                // className="dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* <span className="bi bi-chevron-up"></span> */}
                <img src={three_dots_menu} alt="" />
              </Link>
              <div className="dropdown-menu">
                <Link
                  className="dropdown-item"
                  //   to={`/manage-hospitals/${id}/edit`}
                >
                  <img
                    src={pencil_icon}
                    alt="edit"
                    className="dropdown-menu-icon"
                  />
                  <span>Edit</span>
                </Link>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={handleTogglebtn}
                >
                  {/* <img
                    src={toggle_icon}
                    alt="disable"
                    className="dropdown-menu-icon"
                  /> 
                  <span>Disable</span> */}
                  <div
                    // onClick={handleTogglebtn}
                    className="status-toggle d-flex align-items-center"
                  >
                    <input
                      type="checkbox"
                      id="status"
                      className="check"
                      checked={disable}
                    />
                    <label htmlFor="status" className="checktoggle-small">
                      checkbox
                    </label>
                    <span className="ps-2">
                      {disable ? "Disable" : "Enable"}
                    </span>
                  </div>
                </Link>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => setShow(true)}
                >
                  <img
                    src={bin_icon_red}
                    alt="delete"
                    className="dropdown-menu-icon"
                  />
                  <span className="text-danger">Delete</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-3">
                <div className="doctor-img-wrap">
                  <div className="profile-img">
                    {/* <Link to="#"> */}
                    <img className="" src={dr_profile} alt="#" />
                    {/* </Link> */}
                  </div>
                </div>
              </div>
              <div className="col">
                {/* <div className="col-md-4"> */}
                <div className="profile-info-left pt-3">
                  <h3 className="user-name m-t-0 mb-0">Dr. {data?.name}</h3>
                  <small className="text-muted">MBBS</small>
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>

          <div className="col-md-4 ps-md-5">
            <ul className="personal-info ps-md-5">
              <li>
                <span className="text">
                  <div className="text-dark">
                    <img src={phone_icon} alt="phone" />{" "}
                    <span className="ms-1">{data?.phone_number}</span>
                  </div>
                </span>
              </li>
              <li>
                <span className="text">
                  <div className="text-dark">
                    <img src={email_icon} alt="email" />{" "}
                    <span className="ms-1">{data?.email}</span>
                  </div>
                </span>
              </li>
            </ul>
          </div>

          <div className="col-md-4 pt-4 ps-md-5 pt-md-2">
            <button className="btn hospital-draft-btn text-primary w-75 mt-1">
              Active
            </button>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-12">
            <ul className="personal-info">
              <li>
                <span className="title">Address :</span>
                <span className="text">
                  <p className="w-md-75">
                    Lorem ipsum dolor sit amet consectetur
                  </p>
                </span>
              </li>
              <li>
                <span className="title">District :</span>
                <span className="text">
                  <p className="w-md-75">Hydrabad</p>
                </span>
              </li>
              <li>
                <span className="title">State :</span>
                <span className="text">
                  <p className="w-md-75">Telengana</p>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row border border-secondary-subtle pt-3 pb-1 ms-1 me-1">
              <div className="col">
                <ul className="payment-info w-1">
                  <li>
                    <span className="payment-title">
                      Education:{" "}
                      <span className="fw-semibold text-black">MBBS</span>
                    </span>
                  </li>
                  <li className="mt-3 mb-3">
                    <span className="payment-title">
                      Specialization:{" "}
                      <span className="fw-semibold text-black">ENT</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row border border-secondary-subtle pt-3 pb-1 ms-1 me-1">
              <div className="col">
                <ul className="payment-info w-1">
                  <li>
                    <span className="payment-title">
                      Account Number:{" "}
                      <span className="fw-semibold text-black">
                        111234567900
                      </span>
                    </span>
                  </li>
                  <li className="mt-3 mb-3">
                    <span className="payment-title">
                      Bank Name:{" "}
                      <span className="fw-semibold text-black">Federal</span>
                    </span>
                  </li>
                </ul>
              </div>
              <div className="col">
                <ul className="payment-info">
                  <li>
                    <span className="payment-title">
                      IFSC Code:{" "}
                      <span className="fw-semibold text-black">
                        111234567900
                      </span>
                    </span>
                  </li>
                  <li className="mt-3 mb-3">
                    <span className="payment-title">
                      UPI ID:{" "}
                      <span className="fw-semibold text-black">123@oksbi</span>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="row border border-secondary-subtle pt-3 pb-1 ms-1 me-1 mt-3 file-upload-card">
          <div className="row mb-1">
            <div className="col">
              <h5>Uploaded Documents</h5>
            </div>

            <div className="col">
              <div className="d-flex justify-content-end">
                <img src={pencil_icon} alt="" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            {[1, 2, 3].map((item) => {
              return (
                <div className="row mt-2" key={`row${item}`}>
                  <div className="col-12 pt-2 col-md-2">Documents 0{item}</div>
                  <div className="col-12 col-md-10 md:mt-0 mt-1">
                    <div className="d-flex justify-content-between align-items-center file-upload-details ps-3 pe-3">
                      <div className="d-flex align-items-center">
                        <img src={pdf_icon} alt="pdf_icon" />
                        <div className="d-flex flex-column justify-content-center file-details ms-2">
                          <h6>Reg 0{item}</h6>
                          <p>24MB</p>
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="m-1">
                          <img src={eye_icon} alt="" />
                        </div>
                        <div className="m-1">
                          <img src={cross_icon} alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="profile-tabs">
        <ul className="nav nav-tabs nav-tabs-bottom">
          {tabData.map((tabItem, i) => (
            <li key={tabItem.id + i}>
              <Link
                className={`nav-link ${i == 0 ? "active" : ""}`}
                to={`#${tabItem.id}`}
                data-bs-toggle="tab"
              >
                {tabItem.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="tab-content">
          {tabData.map((tabItem, i) => (
            <Link
              className={`tab-pane ${i == 0 ? "show active" : ""}`}
              id={tabItem.id}
              key={tabItem.id + i}
            >
              {tabItem.content}
            </Link>
          ))}
        </div>
      </div>
      <ConfirmDelete show={show} setShow={setShow} title="Doctors" />
      <ToggleDisable
        show={disableshow}
        setShow={setdisableShow}
        setdisable={setdisable}
        disable={disable}
        title="Doctor"
      />
    </div>
  );
}

// props validation
DoctorDetailsCard.propTypes = {
  doctorId: PropTypes.node,
};

export default DoctorDetailsCard;
