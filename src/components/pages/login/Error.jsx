import { dangericon, error1 } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Error = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const handlClick = (e) => {
    e.preventDefault();
    if (user?.user_type === "hsAdmin") {
      navigate("/");
    } else if (user?.user_type === "staff") {
      navigate("/appointment");
    } else {
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="main-wrapper error-wrapper">
        <div className="error-box">
          <img className="img-fluid" src={error1} alt="Logo" />
          <h3>
            <img className="img-fluid mb-0" src={dangericon} alt="Logo" />{" "}
            Service Unavailable
          </h3>
          <p>You may have mistyped the address or the page may have moved.</p>
          <Link to onClick={handlClick} className="btn btn-primary go-home">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default Error;
