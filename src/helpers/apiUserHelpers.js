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
    const response = await Auth.signUp(email, password, name);
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
    const response = await Auth.signIn(email, password);
    if (response) {
      if (response.name) {
        setUserName(response.name);
        localStorageManager.saveUserName(response.name);
        localStorageManager.saveUserEmail(email);
      }
      setIsLoggedIn(true);
      navigate(NAV_PATHS.MAIN);
    } else {
      setRegisterSuccess("loginError");
      setIsToolTipOpen(true);
    }
  } catch (error) {
    console.error("Error while logging in:", error);
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
    await Auth.signOut();
    setIsLoggedIn(false);
    setUserName("");
    setSavedArticles([]);
    localStorageManager.removeCurrentUser();
    navigate(NAV_PATHS.SIGNIN);
  } catch (error) {
    console.error("Error during the logout process:", error);
  }
};
