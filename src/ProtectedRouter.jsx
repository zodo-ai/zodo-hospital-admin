import FullscreenLoader from "./components/loaders/FullscreenLoader";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import PropTypes from "prop-types";
// import { useGetUser } from "./hooks/useGetUser";

function ProtectedRouter(props) {
  const { allowedRoles } = props;
  const { user, isLoading } = useAuth();
  const userRole = user?.user_type;  
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
  // const { data: user, isLoading } = useGetUser();
  if (isLoading) return <FullscreenLoader />;  
  if (user && allowedRoles && !allowedRoles.includes(userRole)) {
    // localStorage.removeItem("token"); // Remove the token from local storage
    // setUser(null); // Clear the user state
    // navigate("/login"); // Redirect to the login page
    return <Navigate to="/unauthorized" replace />;
  }
  if (!token) return <Navigate to="/login" replace />;
  return <Outlet />;
}

// props validation
ProtectedRouter.propTypes = {
  allowedRoles: PropTypes.array,
};

export default ProtectedRouter;
