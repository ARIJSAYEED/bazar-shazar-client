import { useAuth } from "@clerk/react";
import Loading from "../components/reuseable-components/Loading";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <Loading></Loading>;
  }
  if (!isSignedIn) {
    return <Navigate to="/"></Navigate>;
  }
  return children;
};

export default PrivateRoute;
