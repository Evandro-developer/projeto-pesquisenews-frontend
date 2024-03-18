import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";
import AppContextProvider from "../contexts/AppContextProvider";
import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import PopupController from "./PopupController";
import InfoToolTip from "./InfoToolTip";
import Background from "./Background";
import { localStorageManager } from "../helpers/localStorageHelpers";
import { handleAppFetchData } from "../helpers/apiArticleHelpers";
import { handlersToAppHelpers } from "../helpers/handlersToAppHelpers";

function App() {
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);
  const { selectedArticle, setSelectedArticle } = useContext(
    SelectedArticleContext
  );
  const preloadRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(false);
  const [errorLimiter, setErrorLimiter] = useState(null);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorageManager.getToken());
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [query, setQuery] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchLang, setSearchLang] = useState(lang);
  const [searchScrollY, setSearchScrollY] = useState(false);
  const [summaryScrollY, setSummaryScrollY] = useState(false);
  const [userName, setUserName] = useState("");

  const {
    handleClosePopupCallBack,
    handleCloseInfoToolTipCallBack,
    handleSearchNewsCallback,
    handleSignUpCallback,
    handleSignInCallback,
    handleSignOutCallback,
  } = handlersToAppHelpers({
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
  });

  const contextProps = {
    currentUser,
    setCurrentUser,
    newsData,
    savedArticles,
    setSavedArticles,
    selectedArticle,
    setSelectedArticle,
    setSummaryScrollY,
    setErrorLimiter,
  };

  useEffect(() => {
    const visibility = isPopupOpen || isToolTipOpen;
    setIsBackgroundVisible(visibility);
  }, [isPopupOpen, isToolTipOpen]);

  useEffect(() => {
    if (summaryScrollY && preloadRef.current) {
      preloadRef.current.scrollIntoView({ behavior: "smooth" });
      setSummaryScrollY(false);
    }
  }, [summaryScrollY, preloadRef]);

  useEffect(() => {
    const parsedData = localStorageManager.getNewsData();
    if (parsedData) {
      setQuery(parsedData.query);
      setNewsData(parsedData.articles);
    }
  }, []);

  useEffect(() => {
    const savedName = localStorageManager.getUserName();
    if (savedName && !userName) {
      setUserName(savedName);
    }
    if (userName) {
      localStorageManager.saveUserName(userName);
    }
  }, [userName]);

  useEffect(() => {
    const token = localStorageManager.getToken();
    handleAppFetchData(
      token,
      (userInfo, articles) => {
        // Function handleFetchUserDataSuccess, updates the state of users and saved articles.
        // Function handleFetchUserDataSuccess, atualiza o estado dos usuários e artigos salvos.
        setCurrentUser(userInfo);
        setSavedArticles(articles);
      },
      () => {
        setIsLoggedIn(false);
        setSavedArticles([]);
        localStorageManager.removeCurrentUser();
      }
    );
  }, [isLoggedIn]);

  return (
    <AppContextProvider contextProps={contextProps}>
      <>
        <AppRoutes
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
          query={query}
          setQuery={setQuery}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          isLoading={isLoading}
          isError={isError}
          setIsError={setIsError}
          newsData={newsData}
          onSearch={handleSearchNewsCallback}
          setNewsData={setNewsData}
          searchLang={searchLang}
          setSearchLang={setSearchLang}
          errorLimiter={errorLimiter}
          setErrorLimiter={setErrorLimiter}
          handleSignOut={handleSignOutCallback}
          searchScrollY={searchScrollY}
          setSearchScrollY={setSearchScrollY}
          preloadRef={preloadRef}
        />
        <Footer />
        {isBackgroundVisible && <Background isVisible={isBackgroundVisible} />}
        {isPopupOpen && (
          <PopupController
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
            handleSignIn={handleSignInCallback}
            handleSignUp={handleSignUpCallback}
            handleClosePopup={handleClosePopupCallBack}
          />
        )}
        {isToolTipOpen && (
          <InfoToolTip
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            isToolTipOpen={isToolTipOpen}
            setIsToolTipOpen={setIsToolTipOpen}
            setIsPopupOpen={setIsPopupOpen}
            registerSuccess={registerSuccess}
            handleCloseInfoToolTip={handleCloseInfoToolTipCallBack}
          />
        )}
      </>
    </AppContextProvider>
  );
}

export default App;
