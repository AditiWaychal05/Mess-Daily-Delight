import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "@/lib/auth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/vendor/auth" state={{ from: location.pathname }} replace />;
  }
  return children;
};

export default ProtectedRoute;
