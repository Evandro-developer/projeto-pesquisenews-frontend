import ThirdPartyApi from "./ThirdPartyApi";
import ApiService from "./ApiService";
import Auth from "./Auth";

const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

const removeItem = (key) => {
  localStorage.removeItem(key);
};

const localStorageHelpers = {
  saveNews: (query, articles) => {
    setItem("newsData", JSON.stringify({ query, articles }));
  },
  saveToken: (token) => {
    setItem("token", token);
  },
  saveUserEmail: (email) => {
    setItem("userEmail", email);
  },
  saveUserName: (name) => {
    setItem("name", name);
  },
  removeToken: () => {
    removeItem("token");
  },
  removeUserEmail: () => {
    removeItem("userEmail");
  },
};

export const handleAppNewsSearch = async (
  query,
  onSearchSuccess,
  onSearchError
) => {
  try {
    const { articles = [] } = await ThirdPartyApi.fetchEverything({ q: query });

    if (articles.length === 0) {
      onSearchError();
      return;
    }

    localStorageHelpers.saveNews(query, articles);
    onSearchSuccess(articles);
  } catch (err) {
    onSearchError(err.message || "Erro ao buscar notícias.");
  }
};

export const handleAppFetchData = async (
  token,
  handleFetchUserDataSuccess,
  handleFetchUserDataError,
  setIsLoggedIn,
  setSavedArticles,
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
    setIsLoggedIn(false);
    setSavedArticles([]);
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
      localStorageHelpers.saveToken(data.token);
      localStorageHelpers.saveUserEmail(email);

      if (data.name) {
        setUserName(data.name);
        localStorageHelpers.saveUserName(data.name);
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
  navigate
) => {
  try {
    localStorageHelpers.removeToken();
    localStorageHelpers.removeUserEmail();
    setIsLoggedIn(false);
    setUserName("");
    navigate("/signin");
  } catch (error) {
    console.error(error.message || "Erro durante o processo de logout.");
  }
};
