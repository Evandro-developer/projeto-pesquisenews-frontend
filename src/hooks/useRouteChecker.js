import NAV_PATHS from "../utils/navPaths";
import { useLocation } from "react-router-dom";

const useRouteChecker = () => {
  const location = useLocation();
  const routes = {
    isMainRoute: location.pathname === NAV_PATHS.MAIN,
    isSigninRoute: location.pathname === NAV_PATHS.SIGNIN,
    isSignupRoute: location.pathname === NAV_PATHS.SIGNUP,
    isSavedNewsRoute: location.pathname === NAV_PATHS.SAVED_NEWS,
    isViewNewsRoute: location.pathname === NAV_PATHS.VIEW_NEWS,
    isHomePage: [NAV_PATHS.MAIN, NAV_PATHS.SIGNIN, NAV_PATHS.SIGNUP].includes(
      location.pathname
    ),
  };
  return routes;
};

export default useRouteChecker;
