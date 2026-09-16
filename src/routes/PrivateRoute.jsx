import { Navigate } from "react-router";
import Loading from "../components/reuseable-components/Loading";
import { useAuth } from "@clerk/react";

const PrivateRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  if (!isLoaded) {
    return <Loading></Loading>;
  }
  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default PrivateRoute;
