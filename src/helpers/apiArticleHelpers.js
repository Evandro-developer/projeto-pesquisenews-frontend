import ApiService from "../utils/ApiService";

export const handleAppFetchData = async (
  token,
  handleFetchUserDataSuccess,
  handleFetchUserDataError,
  setSavedArticles,
  setIsLoggedIn,
  setCurrentUser
) => {
  if (token) {
    try {
      const userInfo = await ApiService.getUserInfo();
      const savedArticlesResponse = await ApiService.getSavedArticles();
      handleFetchUserDataSuccess(userInfo, savedArticlesResponse.articles);
    } catch (error) {
      handleFetchUserDataError(
        error.message || "Error while fetching user data or saved articles."
      );
    }
  } else {
    () => setSavedArticles([]);
    () => setIsLoggedIn(false);
    () => setCurrentUser(false);
  }
};
