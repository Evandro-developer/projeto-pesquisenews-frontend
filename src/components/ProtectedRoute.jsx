import { Navigate } from "react-router-dom";
import NAV_PATHS from "../utils/navPaths";

function ProtectedRoute({ children, loggedIn }) {
  if (loggedIn) {
    return children;
  } else {
    return <Navigate to={NAV_PATHS.SIGNIN} replace />;
  }
}

export default ProtectedRoute;
