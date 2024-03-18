import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import NAV_PATHS from "../utils/navPaths";
import Header from "./Header";
import Main from "./Main";
import SavedNews from "./SavedNews";
import ViewNews from "./ViewNews";

function AppRoutes({
  errorLimiter,
  isLoggedIn,
  setIsLoggedIn,
  isPopupOpen,
  setIsPopupOpen,
  isClosing,
  setIsClosing,
  query,
  setQuery,
  savedArticles,
  setSavedArticles,
  isLoading,
  isError,
  newsData,
  setNewsData,
  onSearch,
  searchLang,
  setSearchLang,
  searchScrollY,
  setSearchScrollY,
  handleSignOut,
  preloadRef,
}) {
  function renderAuthRoute() {
    if (isLoggedIn) {
      return <Navigate to={NAV_PATHS.MAIN} />;
    }

    return (
      <>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          handleSignOut={handleSignOut}
          onSearch={onSearch}
          searchLang={searchLang}
          setSearchLang={setSearchLang}
          setSearchScrollY={setSearchScrollY}
        />
        <Main
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          isError={isError}
          newsData={newsData}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          query={query}
          setQuery={setQuery}
          setNewsData={setNewsData}
          searchScrollY={searchScrollY}
          setSearchScrollY={setSearchScrollY}
        />
      </>
    );
  }

  function renderViewNewsRoute() {
    return (
      <ViewNews
        errorLimiter={errorLimiter}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setIsPopupOpen={setIsPopupOpen}
        savedArticles={savedArticles}
        setSavedArticles={setSavedArticles}
        isClosing={isClosing}
        setIsClosing={setIsClosing}
        handleSignOut={handleSignOut}
        preloadRef={preloadRef}
      />
    );
  }

  function renderMainRoute() {
    return (
      <ProtectedRoute loggedIn={isLoggedIn}>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          handleSignOut={handleSignOut}
          onSearch={onSearch}
          searchLang={searchLang}
          setSearchLang={setSearchLang}
          setSearchScrollY={setSearchScrollY}
        />
        <Main
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          isError={isError}
          newsData={newsData}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          query={query}
          setQuery={setQuery}
          setNewsData={setNewsData}
          searchScrollY={searchScrollY}
          setSearchScrollY={setSearchScrollY}
        />
      </ProtectedRoute>
    );
  }

  function renderSavedNewsRoute() {
    return (
      <ProtectedRoute loggedIn={isLoggedIn}>
        <SavedNews
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          handleSignOut={handleSignOut}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
        />
      </ProtectedRoute>
    );
  }

  return (
    <Routes>
      <Route path={NAV_PATHS.SIGNUP} element={renderAuthRoute()} />
      <Route path={NAV_PATHS.SIGNIN} element={renderAuthRoute()} />
      <Route path={NAV_PATHS.VIEW_NEWS} element={renderViewNewsRoute()} />
      <Route path={NAV_PATHS.MAIN} element={renderMainRoute()} />
      <Route path={NAV_PATHS.SAVED_NEWS} element={renderSavedNewsRoute()} />
      <Route path="*" element={<Navigate to={NAV_PATHS.SIGNIN} />} />
    </Routes>
  );
}

export default AppRoutes;
