import ThirdPartyApi from "../utils/ThirdPartyApi";
import ApiService from "../utils/ApiService";
import Auth from "../utils/Auth";
import { localStorageManager } from "./localStorageHelpers";

export const handleAppNewsSearch = async (
  query,
  language,
  onSearchSuccess,
  onSearchError
) => {
  try {
    localStorageManager.removeNewsData();

    const { articles = [] } = await ThirdPartyApi.fetchEverything({
      q: query,
      lang: language,
    });

    if (articles.length === 0) {
      onSearchError();
      return;
    }

    localStorageManager.saveNewsData(query, articles);
    onSearchSuccess(articles);
  } catch (err) {
    onSearchError(err.message || "Erro ao buscar notícias.");
  }
};

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
        error.message || "Erro ao recuperar dados do usuário ou artigos salvos."
      );
    }
  } else {
    () => setSavedArticles([]);
    () => setIsLoggedIn(false);
    () => setCurrentUser(false);
  }
};

export const handleAppSignUp = async (
  email,
  password,
  name,
  setRegisterSuccess,
  navigate,
  setToolTipOpen
) => {
  try {
    const response = await Auth.register(email, password, name);

    if (response) {
      setRegisterSuccess("success");
      setToolTipOpen(true);
      navigate("/signin");
    }
  } catch (error) {
    setRegisterSuccess(error.message || "Erro durante o processo de registro.");
  }
};

export const handleAppSignIn = async (
  email,
  password,
  setUserName,
  setIsLoggedIn,
  navigate,
  setRegisterSuccess
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
      navigate("/");
    } else {
      setRegisterSuccess("error");
    }
  } catch (error) {
    setRegisterSuccess(error.message || "Erro durante o processo de login.");
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
    navigate("/signin");
  } catch (error) {
    console.error(error.message || "Erro durante o processo de logout.");
  }
};
