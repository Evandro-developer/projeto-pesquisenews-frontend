import { handleAppNewsSearch } from "./apiThirdPartyApiHelpers";
import {
  handleAppSignUp,
  handleAppSignIn,
  handleAppSignOut,
} from "./apiUserHelpers";

export const handlersToAppHelpers = ({
  setIsClosing,
  setIsPopupOpen,
  setIsToolTipOpen,
  setIsError,
  setIsLoading,
  setNewsData,
  setQuery,
  setRegisterSuccess,
  setIsLoggedIn,
  setUserName,
  setSavedArticles,
  navigate,
}) => {
  const closeWithAnimation = (setOpenState) => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenState(false);
      setIsClosing(false);
    }, 100);
  };

  const handleClosePopupCallBack = () => closeWithAnimation(setIsPopupOpen);
  const handleCloseInfoToolTipCallBack = () =>
    closeWithAnimation(setIsToolTipOpen);

  const handleSearchNewsCallback = (query, searchLang) => {
    setIsError(false);
    setIsLoading(true);
    setNewsData([]);
    setQuery(query);

    handleAppNewsSearch(
      query,
      searchLang,
      (articles) => {
        // Callback onSearchSuccess, updates the 'newsData' state with the received articles.
        // Callback onSearchSuccess, atualiza o estado 'newsData' com os artigos recebidos.
        setIsError(false);
        setIsLoading(false);
        setNewsData(articles);
      },

      () => {
        // Callback onSearchError, indicates that an error occurred during the search.
        // Callback onSearchError, indica que ocorreu um erro durante a busca.
        setIsError(true);
        setIsLoading(false);
      }
    );
  };

  const handleSignUpCallback = (email, password, name) => {
    handleAppSignUp(
      email,
      password,
      name,
      setRegisterSuccess,
      navigate,
      setIsToolTipOpen
    );
  };

  const handleSignInCallback = (email, password) => {
    handleAppSignIn(
      email,
      password,
      setUserName,
      setIsLoggedIn,
      navigate,
      setRegisterSuccess,
      setIsToolTipOpen
    );
  };

  const handleSignOutCallback = () => {
    handleAppSignOut(setIsLoggedIn, setUserName, setSavedArticles, navigate);
  };

  return {
    handleClosePopupCallBack,
    handleCloseInfoToolTipCallBack,
    handleSearchNewsCallback,
    handleSignUpCallback,
    handleSignInCallback,
    handleSignOutCallback,
  };
};
