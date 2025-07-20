import { Link, useNavigate } from "react-router-dom";
import { login02, mainLogo } from "../../imagepath";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useState } from "react";
import { Eye, EyeOff } from "feather-icons-react/build/IconComponents";
import { useAuth } from "../../../hooks/useAuth";
import FullscreenLoader from "../../loaders/FullscreenLoader";
import { useForm } from "react-hook-form";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const { login, validationError, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    login(data, {
      onSuccess: (userData) => {
        const token = userData?.data?.tokens?.accessToken;

        if (rememberMe) {
          localStorage.setItem("token", token);
        } else {
          sessionStorage.setItem("token", token);
        }

        const userRole = userData?.data?.user_type;
        if (userRole === "hsAdmin") {
          navigate("/");
        }
        if (userRole === "staff") {
          navigate("/appointment");
        }
      },
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {isLoading && <FullscreenLoader />}
      <div className="main-wrapper login-body">
        <div className="container-fluid px-0">
          <div className="row">
            <div className="col-lg-6 login-wrap">
              <div className="login-sec">
                <div className="log-img">
                  <img className="img-fluid" src={login02} alt="#" />
                </div>
              </div>
            </div>
            <div className="col-lg-6 login-wrap-bg">
              <div className="login-wrapper">
                <div className="loginbox">
                  <div className="login-right">
                    <div className="login-right-wrap">
                      <div className="account-logo d-flex justify-content-md-start justify-content-center">
                        <Link to="/login">
                          <img src={mainLogo} alt="#" width={150} />
                        </Link>
                      </div>
                      <h2>Login</h2>
                      {/* Form */}
                      <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className={`form-control ${
                              errors !== undefined && errors["email"]
                                ? "is-invalid"
                                : ""
                            }`}
                            type="text"
                            {...register("email", {
                              required: "Email is required",
                            })}
                          />
                          {errors !== undefined && errors["email"] && (
                            <div className="invalid-feedback">
                              {errors !== undefined && errors["email"].message}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            type={!passwordVisible ? "password" : ""}
                            className={`form-control pass-input ${
                              errors !== undefined && errors["password"]
                                ? "is-invalid"
                                : ""
                            }`}
                            {...register("password", {
                              required: "Password is required",
                            })}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors !== undefined && errors["password"] ? null : (
                            <span
                              className="toggle-password"
                              onClick={togglePasswordVisibility}
                            >
                              {!passwordVisible ? (
                                <EyeOff className="react-feather-custom" />
                              ) : (
                                <Eye className="react-feather-custom" />
                              )}
                            </span>
                          )}
                          {errors !== undefined && errors["password"] && (
                            <div className="invalid-feedback">
                              {errors !== undefined &&
                                errors["password"].message}
                            </div>
                          )}
                        </div>

                        {validationError && (
                          <div
                            className="pb-2 text-danger"
                            style={{ fontSize: "15px" }}
                          >
                            {validationError}
                          </div>
                        )}
                        <div className="forgotpass">
                          <div className="remember-me">
                            <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                              {" "}
                              Remember me
                              <input
                                type="checkbox"
                                name="radio"
                                checked={rememberMe}
                                onClick={(e) => setRememberMe(e.target.checked)}
                              />
                              <span className="checkmark" />
                            </label>
                          </div>
                          <Link to="/forgotpassword" className="text-primary">
                            Forgot Password?
                          </Link>
                        </div>
                        <div className="form-group login-btn mt-3">
                          <button
                            type="submit"
                            // to="/dashboard"
                            className="btn btn-primary btn-block"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
