import { useState } from "react";
import { login02, mainLogo } from "../../imagepath";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "react-feather";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../../../apis/auth";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { user_id } = useParams();
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: updatePassword, // API function to create
    onSuccess: (data) => {
      const message = data?.message ?? "Password reset completed";
      toast.success(message);
      navigate(`/login`);
    },
    onError: (error) => {
      const errorMessage =
        error.response.data?.validationErrors ?? "Password reset failed";
      toast.error(errorMessage);
    },
  });

  const handleReset = (data) => {
    const resetPwdData = {
      user_id: user_id,
      newPassword: data.password,
      confirmPassword: data?.confirmpassword,
    };
    mutation.mutate(resetPwdData);
  };
  return (
    <>
      <div className="main-wrapper login-body">
        <div className="container-fluid px-0">
          <div className="row">
            {/* Login logo */}
            <div className="col-lg-6 login-wrap">
              <div className="login-sec">
                <div className="log-img">
                  <img className="img-fluid" src={login02} alt="Logo" />
                </div>
              </div>
            </div>
            {/* /Login logo */}
            {/* Login Content */}
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
                      <h2>Change Password</h2>
                      {/* Form */}
                      <form onSubmit={handleSubmit(handleReset)}>
                        <div className="form-group">
                          <label>
                            New Password <span className="login-danger">*</span>
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

                        <div className="form-group mt-3">
                          <label>
                            Confirm Password{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type={!passwordVisible ? "confirmpassword" : ""}
                            className={`form-control pass-input ${
                              errors !== undefined && errors["confirmpassword"]
                                ? "is-invalid"
                                : ""
                            }`}
                            {...register("confirmpassword", {
                              required: "Please confirm password",
                            })}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors !== undefined &&
                            errors["confirmpassword"] && (
                              <div className="invalid-feedback">
                                {errors !== undefined &&
                                  errors["confirmpassword"].message}
                              </div>
                            )}
                        </div>

                        <div className="form-group login-btn mt-3">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            Reset Password
                          </button>
                        </div>
                      </form>
                      {/* /Form */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Login Content */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
