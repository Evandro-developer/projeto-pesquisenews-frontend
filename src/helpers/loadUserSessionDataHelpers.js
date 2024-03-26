import ApiService from "../utils/ApiService";
import Auth from "../utils/Auth";

export const loadUserSessionData = async (
  handleFetchUserDataSuccess,
  handleFetchUserDataError,
  setSavedArticles,
  setIsLoggedIn,
  setCurrentUser
) => {
  try {
    const response = await Auth.verifySession();
    if (!response || response.message.includes("No token provided")) {
      setIsLoggedIn(false);
      setSavedArticles([]);
      setCurrentUser({});
      return;
    }

    setIsLoggedIn(true);
    const userInfoResponse = await ApiService.getUserInfo();
    const articlesResponse = await ApiService.getSavedArticles();
    handleFetchUserDataSuccess(userInfoResponse, articlesResponse.articles);
  } catch (error) {
    handleFetchUserDataError(
      error.message || "Error while verifying session or fetching data."
    );
    setIsLoggedIn(false);
    setSavedArticles([]);
    setCurrentUser({});
  }
};
