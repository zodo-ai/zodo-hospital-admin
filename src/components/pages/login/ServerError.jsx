import { useAuth } from "../../../hooks/useAuth";
import { dangericon, error02 } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";

const ServerError = () => {
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
          <img className="img-fluid" src={error02} alt="Logo" />
          <h3>
            <img className="img-fluid mb-0" src={dangericon} alt="Logo" />{" "}
            Internal Server Error
          </h3>
          <p>You do not have permission to view this resource</p>
          <Link onClick={handlClick} to className="btn btn-primary go-home">
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default ServerError;
