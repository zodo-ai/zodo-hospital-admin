import { Link, useNavigate } from "react-router-dom";
import { login02, mainLogo } from "../../imagepath";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../../apis/auth";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: forgotPassword, // API function to create
    onSuccess: (data) => {
      const message = data?.message ?? "OTP generated successfully";
      toast.success(message);
      const userId = data?.data?.user_id;
      navigate(`/forgotpassword/${userId}`);
    },
    onError: (error) => {
      const errorMessage =
        error.response.data?.validationErrors ?? "OTP generation failed";
      toast.error(errorMessage);
    },
  });

  const handleResetPassword = (data) => {
    const user = {
      email: data.email,
    };
    mutation.mutate(user);
  };
  return (
    <div>
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
                      {/* <div className="account-logo">
                        <Link to="/">
                          <img src={mainLogo} alt="#" />
                        </Link>
                      </div> */}
                      <div className="account-logo d-flex justify-content-md-start justify-content-center">
                        <Link to="/login">
                          <img src={mainLogo} alt="#" width={150} />
                        </Link>
                      </div>
                      <h2>Reset Password</h2>
                      {/* Form */}
                      <form onSubmit={handleSubmit(handleResetPassword)}>
                        <label>
                          Email <span className="login-danger">*</span>
                        </label>
                        <input
                          className={`form-control ${
                            errors !== undefined && errors["email"]
                              ? "is-invalid"
                              : ""
                          }`}
                          type="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                        />
                        {errors !== undefined && errors["email"] && (
                          <div className="invalid-feedback">
                            {errors !== undefined && errors["email"].message}
                          </div>
                        )}
                        <div className="form-group login-btn mt-3">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                          >
                            {/* <Link to="/login" /> */}
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
    </div>
  );
};

export default ForgotPassword;
