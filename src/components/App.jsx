import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AppContextProvider from "../contexts/AppContextProvider";
import useLang from "../hooks/useLang";
import useSelectedArticle from "../hooks/useSelectedArticle";
import { localStorageManager } from "../helpers/localStorageHelpers";
import { loadUserSessionData } from "../helpers/loadUserSessionDataHelpers";
import { handlersToAppHelpers } from "../helpers/handlersToAppHelpers";
import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import PopupController from "./PopupController";
import InfoToolTip from "./InfoToolTip";
import Background from "./Background";

function App() {
  const navigate = useNavigate();
  const { lang } = useLang();
  const { selectedArticle, setSelectedArticle } = useSelectedArticle();
  const preloadRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(false);
  const [errorLimiter, setErrorLimiter] = useState(null);
  const [isBackgroundVisible, setIsBackgroundVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const onSessionInitialize = useCallback(() => {
    loadUserSessionData(
      (userInfo, articles) => {
        // Function handleFetchUserDataSuccess
        setCurrentUser(userInfo);
        setSavedArticles(articles);
        setIsLoggedIn(true);
      },
      () => {
        // Function handleFetchUserDataError
        setCurrentUser({});
        setSavedArticles([]);
        setIsLoggedIn(false);
      },
      setCurrentUser,
      setIsLoggedIn,
      setSavedArticles,
      isLoggedIn
    );
  }, [isLoggedIn]);

  useEffect(() => {
    onSessionInitialize();
  }, [onSessionInitialize]);

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
          setNewsData={setNewsData}
          searchLang={searchLang}
          setSearchLang={setSearchLang}
          errorLimiter={errorLimiter}
          setErrorLimiter={setErrorLimiter}
          searchScrollY={searchScrollY}
          setSearchScrollY={setSearchScrollY}
          preloadRef={preloadRef}
          onSearch={handleSearchNewsCallback}
          onSignOut={handleSignOutCallback}
        />

        {isBackgroundVisible && <Background isVisible={isBackgroundVisible} />}
        {isPopupOpen && (
          <PopupController
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            isPopupOpen={isPopupOpen}
            setIsPopupOpen={setIsPopupOpen}
            onSignIn={handleSignInCallback}
            onSignUp={handleSignUpCallback}
            onClose={handleClosePopupCallBack}
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
            onClose={handleCloseInfoToolTipCallBack}
          />
        )}
        <Footer />
      </>
    </AppContextProvider>
  );
}

export default App;
