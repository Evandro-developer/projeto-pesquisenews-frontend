import Auth from "../utils/Auth";
import NAV_PATHS from "../utils/navPaths";
import { localStorageManager } from "./localStorageHelpers";

export const handleAppSignUp = async (
  email,
  password,
  name,
  setRegisterSuccess,
  navigate,
  setIsToolTipOpen
) => {
  try {
    const response = await Auth.register(email, password, name);

    if (response) {
      setRegisterSuccess("success");
      setIsToolTipOpen(true);
      navigate(NAV_PATHS.SIGNIN);
    }
  } catch (error) {
    setRegisterSuccess("registerError");
    setIsToolTipOpen(true);
  }
};

export const handleAppSignIn = async (
  email,
  password,
  setUserName,
  setIsLoggedIn,
  navigate,
  setRegisterSuccess,
  setIsToolTipOpen
) => {
  try {
    const data = await Auth.login(email, password);

    if (data.token) {
      localStorageManager.saveToken(data.token);
      localStorageManager.saveUserEmail(email);

      if (data.name) {
        setUserName(data.name);
        localStorageManager.saveUserName(data.name);
      }

      setIsLoggedIn(true);
      navigate(NAV_PATHS.MAIN);
    }
  } catch (error) {
    setRegisterSuccess("loginError");
    setIsToolTipOpen(true);
  }
};

export const handleAppSignOut = async (
  setIsLoggedIn,
  setUserName,
  setSavedArticles,
  navigate
) => {
  try {
    localStorageManager.removeToken();
    localStorageManager.removeUserEmail();
    setIsLoggedIn(false);
    setUserName("");
    setSavedArticles([]);
    navigate(NAV_PATHS.SIGNIN);
  } catch (error) {
    console.error(error.message || "Error during the logout process.");
  }
};
