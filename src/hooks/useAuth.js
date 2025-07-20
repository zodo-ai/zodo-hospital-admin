import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { login } from "../apis/auth";
import { useGetUser } from "./useGetUser";
import { toast } from "react-toastify";
// import { useGetUser } from "./useGetUser";
// import { login, logout, getUser } from "./authService";

// Create Context for Authentication
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [hospitalId, setHospitalId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const { mutate: getUser } = useGetUser();
  // const { data: userData } = useGetUser();
  const saveAccessToken = (token) => {
    setAccessToken(token);
  };

  const clearAccessToken = () => {
    setAccessToken(null);
  };
  // console.log("User data", userData);

  // Fetch user data when the component mounts
  const fetchUserData = async () => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token"); // Get the token from local storage
    if (token) {
      const user = await getUser(); // Fetch user data if token exists
      // console.log("User data from local storage", user);
      setUser(user?.data?.data);
      const hospitalId = user?.data?.data?.hospital_id;
      if (hospitalId) {
        setHospitalId(hospitalId); // Set hospital ID if it exists
      }
    } else {
      setHospitalId(null);
      setUser(null); // Set user to null if no token is found
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data?.data?.user_type === "superAdmin") {
        const message = "Invalid credentials";
        toast.error(message);
      } else {
        const token = data?.data?.tokens?.accessToken;
        // localStorage.setItem("token", data?.data?.tokens?.accessToken);
        setAccessToken(token);
        setUser(data.data);
        setHospitalId(data?.data?.hospital_id); // Set hospital ID from login response
        queryClient.invalidateQueries(["user"]); // Refresh user data
      }
    },
    onError: (error) => {
      const errorMessage = error?.response?.data?.message;
      setValidationError(errorMessage || "Something went wrong");
    },
  });

  // Login mutation
  // const getUserMutation = () => {
  //   return useQuery({
  //     queryKey: ["user"], // Unique query key
  //     queryFn: () => getUser(),
  //   });
  // };

  // Logout mutation
  // const logoutMutation = useMutation({
  //   mutationFn: logout,
  //   onSuccess: () => {
  //     localStorage.removeItem("token");
  //     setUser(null);
  //     queryClient.setQueryData(["user"], null);
  //   },
  // });

  // useEffect(() => {
  //   const token = localStorage.getItem("token"); // Get the token from local storage
  //   console.log("Token from local storage", token);

  //   if (token) {
  //     setAccessToken(token);
  //     getUserMutation(); // Fetch user data if token exists
  //   }
  // }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: loginMutation.isPending,
        login: loginMutation.mutate,
        validationError,
        saveAccessToken,
        clearAccessToken,
        accessToken,
        setUser,
        setHospitalId,
        // getUser: getUserMutation.mutate,
        // logout: logoutMutation.mutate,
        hospitalId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// Custom hook to use authentication
export const useAuth = () => {
  return useContext(AuthContext);
};
