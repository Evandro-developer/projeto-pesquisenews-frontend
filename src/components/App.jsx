import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LangProvider } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

import AppRoutes from "./AppRoutes";
import Footer from "./Footer";
import InfoToolTip from "./InfoToolTip";
import PopupController from "./PopupController";
import {
  handleAppNewsSearch,
  handleAppFetchData,
  handleAppSignUp,
  handleAppSignIn,
  handleAppSignOut,
} from "../helpers/apiHelpers";

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(false);
  const [newsData, setNewsData] = useState([]);
  const [savedArticles, setSavedArticles] = useState([]);
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);

  const closeWithAnimation = (setOpenState) => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenState(false);
      setIsClosing(false);
    }, 100);
  };

  const handleClosePopup = () => closeWithAnimation(setIsPopupOpen);
  const handleCloseInfoToolTip = () => closeWithAnimation(setIsToolTipOpen);

  const handleSearchNewsCallback = (query) => {
    setIsLoading(true);
    setNewsData([]);
    setQuery(query);

    handleAppNewsSearch(
      query,
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
    handleAppSignOut(setIsLoggedIn, setUserName, navigate);
  };

  useEffect(() => {
    const dataToSave = {
      query: query,
      articles: newsData,
    };
    localStorage.setItem("newsData", JSON.stringify(dataToSave));
  }, [newsData, query]);

  useEffect(() => {
    const savedNewsData = localStorage.getItem("newsData");
    if (savedNewsData) {
      const parsedData = JSON.parse(savedNewsData);
      setQuery(parsedData.query);
      setNewsData(parsedData.articles);
    }
  }, []);

  useEffect(() => {
    const savedName = localStorage.getItem("name");
    if (savedName && !userName) {
      setUserName(savedName);
    }
    if (userName) {
      localStorage.setItem("name", userName);
    }
  }, [userName]);

  useEffect(() => {
    handleAppFetchData(
      localStorage.getItem("token"),
      (userInfo, articles) => {
        // Function handleFetchUserDataSuccess
        setCurrentUser(userInfo);
        setSavedArticles(articles);
      },
      setIsLoggedIn,
      setSavedArticles,
      setCurrentUser
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
            handleSignOut={handleSignOutCallback}
            onSearch={handleSearchNewsCallback}
            isLoading={isLoading}
            isError={isError}
            newsData={newsData}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
          />
          <Footer />

          {isPopupOpen && (
            <PopupController
              isPopupOpen={isPopupOpen}
              setIsPopupOpen={setIsPopupOpen}
              handleSignIn={handleSignInCallback}
              handleSignUp={handleSignUpCallback}
              isClosing={isClosing}
              setIsClosing={setIsClosing}
              isMounted={isMounted}
              setIsMounted={setIsMounted}
              handleClosePopup={handleClosePopup}
            />
          )}

          {isToolTipOpen && (
            <InfoToolTip
              isToolTipOpen={isToolTipOpen}
              setIsPopupOpen={setIsPopupOpen}
              isClosing={isClosing}
              setIsClosing={setIsClosing}
              isMounted={isMounted}
              setIsMounted={setIsMounted}
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
