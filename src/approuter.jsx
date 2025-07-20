import React from "react";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Settingssociallinks from "./components/settings/Settingssociallinks";
import SettingsChangePassword from "./components/settings/SettingsChangePassword";
// import DoctorList from "./components/doctor/DoctorList";
import ForgotPassword from "./components/pages/login/ForgotPassword";
import Signup from "./components/pages/login/Signup";
import Register from "./components/pages/login/Register";
import LockScreen from "./components/pages/login/LockScreen";
import ChangePassword from "./components/pages/login/ChangePassword";
import Error from "./components/pages/login/Error";
import ServerError from "./components/pages/login/ServerError";
import BlankPage from "./components/pages/login/BlankPage";
import Setting from "./components/settings/Setting";
import EditHospital from "./components/pages/Hospitals/EditHospital";
import DoctorDetails from "./components/pages/Doctors/DoctorDetails";
import Appointment from "./components/pages/Appointment/Appointment";
import DoctorManage from "./components/pages/Doctors/DoctorManage";
import StaffManage from "./components/pages/Staff/StaffManage";
import HospitalServices from "./components/pages/Hospitals/HospitalServices";
import ProtectedRouter from "./ProtectedRouter";
import { useAuth } from "./hooks/useAuth";
import PublicRoute from "./components/PublicRoute";
import { ToastContainer } from "react-toastify";
import Finance from "./components/pages/Finance/Finance";
import Departments from "./components/pages/Hospitals/Departments";
import ViewHospitalService from "./components/pages/Hospitals/ViewHospitalService";
import StaffDetails from "./components/pages/Staff/StaffDetails";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import VerifyOtp from "./components/pages/login/Verify";
//Accounts
const Approuter = () => {
  // eslint-disable-next-line no-unused-vars
  // const config = "/react/template"
  const { user } = useAuth();
  return (
    <>
      <ToastContainer />
      <BrowserRouter basename="/">
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/register" element={<Register />} />
            <Route path="/lockscreen" element={<LockScreen />} />
            <Route path="/forgotpassword/:user_id/reset_password" element={<ChangePassword />} />
            <Route path="/forgotpassword/:user_id" element={<VerifyOtp />} />
            <Route path="/error" element={<Error />} />
            <Route path="/blankpage" element={<BlankPage />} />
            <Route path="/settings" element={<Setting />} />
            <Route
              path="/settingssociallink"
              element={<Settingssociallinks />}
            />
            <Route
              path="/settingschangepassword"
              element={<SettingsChangePassword />}
            />
          </Route>
          <Route path="/unauthorized" element={<ServerError />} />
          {/* <Route path="*" element={<ServerError />} /> */}
          <Route path="*" element={<Error />} />

          {/* <Route
            element={
              <ProtectedRouter allowedRoles={user?.user_type && ["staff"]} />
            }
          > */}
            <Route path="/appointment" element={<Appointment />} />
          {/* </Route> */}

          <Route
            element={
              <ProtectedRouter allowedRoles={user?.user_type && "hsAdmin"} />
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/doctor-manage" element={<DoctorManage />} />
            <Route path="/doctor-manage/:id" element={<DoctorDetails />} />
            <Route path="/staff-manage" element={<StaffManage />} />
            <Route path="/staff-manage/:id" element={<StaffDetails />} />
            <Route path="/hospital/services" element={<HospitalServices />} />
            <Route
              path="/hospital/services/:id"
              element={<ViewHospitalService />}
            />
            <Route path="/hospital/departments" element={<Departments />} />
            <Route path="/hospital/edit" element={<EditHospital />} />
            <Route path="/finance" element={<Finance />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <div className="sidebar-overlay"></div>
    </>
  );
};

export default Approuter;
