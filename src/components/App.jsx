import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LangProvider } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { LangContext } from "../contexts/LanguageContext";

import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import InfoToolTip from "./InfoToolTip";
import PopupController from "./PopupController";
import { localStorageManager } from "../helpers/localStorageHelpers";
import {
  handleAppNewsSearch,
  handleAppFetchData,
  handleAppSignUp,
  handleAppSignIn,
  handleAppSignOut,
} from "../helpers/apiHelpersToApp";

function App() {
  const navigate = useNavigate();
  const { lang } = useContext(LangContext);

  const [currentUser, setCurrentUser] = useState(false);
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
  const [userName, setUserName] = useState("");

  const closeWithAnimation = (setOpenState) => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenState(false);
      setIsClosing(false);
    }, 100);
  };

  const handleClosePopup = () => closeWithAnimation(setIsPopupOpen);
  const handleCloseInfoToolTip = () => closeWithAnimation(setIsToolTipOpen);

  const handleSearchNewsCallback = (query, searchLang) => {
    setIsLoading(true);
    setNewsData([]);
    setQuery(query);

    handleAppNewsSearch(
      query,
      searchLang,
      (articles) => {
        // Callback onSearchSuccess
        setIsError(false);
        setIsLoading(false);
        setNewsData(articles);
      },

      () => {
        // Callback onSearchError
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
      setRegisterSuccess
    );
  };

  const handleSignOutCallback = () => {
    handleAppSignOut(setIsLoggedIn, setUserName, setSavedArticles, navigate);
  };

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
        // Function handleFetchUserDataSuccess
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
    <LangProvider>
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
            newsData={newsData}
            onSearch={handleSearchNewsCallback}
            setNewsData={setNewsData}
            searchLang={searchLang}
            setSearchLang={setSearchLang}
            handleSignOut={handleSignOutCallback}
          />
          <Footer />

          {isPopupOpen && (
            <PopupController
              isClosing={isClosing}
              setIsClosing={setIsClosing}
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              handleSignIn={handleSignInCallback}
              handleSignUp={handleSignUpCallback}
              handleClosePopup={handleClosePopup}
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
              handleCloseInfoToolTip={handleCloseInfoToolTip}
            />
          )}
        </>
      </CurrentUserContext.Provider>
    </LangProvider>
  );
}

export default App;
