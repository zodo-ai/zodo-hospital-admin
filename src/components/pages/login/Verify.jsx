import { useRef, useState } from "react";
import { login02, mainLogo } from "../../imagepath";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../../../apis/auth";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];
  const [otp, setOtp] = useState(["", "", "", ""]); // array of 4 characters
  const { user_id } = useParams();
  const navigate = useNavigate();
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 3) {
        otpRefs[index + 1].current.focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current.focus();
    }
  };

  const mutation = useMutation({
    mutationFn: verifyOTP, // API function to create
    onSuccess: (data) => {
      const message = data?.message ?? "OTP verification successfull";
      toast.success(message);
      // const userId = data?.data?.user_id;
      navigate(`/forgotpassword/${user_id}/reset_password`);
    },
    onError: (error) => {
      const errorMessage =
        error.response.data?.validationErrors ?? "OTP verification failed";
      toast.error(errorMessage);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join(""); // final 4-digit OTP
    const data = {
      user_id: user_id,
      otp: otpString,
    };
    mutation.mutate(data);
    // You can send otpString to your backend here
  };

  return (
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

          {/* Login Content */}
          <div className="col-lg-6 login-wrap-bg">
            <div className="login-wrapper">
              <div className="loginbox">
                <div className="login-right">
                  <div className="login-right-wrap">
                    {/* <div className="account-logo">
                      <Link to="/login">
                        <img src={loginlogo} alt="Logo" />
                      </Link>
                    </div> */}
                    <div className="account-logo d-flex justify-content-md-start justify-content-center">
                      <Link to="/login">
                        <img src={mainLogo} alt="#" width={150} />
                      </Link>
                    </div>
                    <h2>Enter OTP</h2>

                    <label style={{ fontSize: "0.9rem" }}>
                      Enter 4-digit OTP <span className="login-danger">*</span>
                    </label>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <div className="d-flex gap-2 mt-2 w-50">
                          {otpRefs.map((ref, index) => (
                            <input
                              key={index}
                              type="text"
                              maxLength="1"
                              inputMode="numeric"
                              pattern="[0-9]*"
                              className="form-control text-center"
                              ref={ref}
                              value={otp[index]}
                              onChange={(e) => handleChange(e, index)}
                              onKeyDown={(e) => handleKeyDown(e, index)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="form-group login-btn">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Verify OTP
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Login Content */}
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
