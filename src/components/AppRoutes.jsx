import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import SavedNews from "./SavedNews";
import ViewNews from "./ViewNews";

function AppRoutes(props) {
  const {
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
    handleSignOut,
  } = props;

  function renderAuthRoute() {
    if (isLoggedIn) {
      return <Navigate to="/" />;
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
        />
      </>
    );
  }

  function renderViewNewsRoute() {
    return (
      <>
        <ViewNews
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          handleSignOut={handleSignOut}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          isClosing={isClosing}
          setIsClosing={setIsClosing}
        />
      </>
    );
  }

  function renderMainRoute() {
    return (
      <ProtectedRoute loggedIn={isLoggedIn}>
        <>
          <Header
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsPopupOpen={setIsPopupOpen}
            handleSignOut={handleSignOut}
            onSearch={onSearch}
            searchLang={searchLang}
            setSearchLang={setSearchLang}
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
          />
        </>
      </ProtectedRoute>
    );
  }

  function renderSavedNewsRoute() {
    return (
      <ProtectedRoute loggedIn={isLoggedIn}>
        <>
          <SavedNews
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setIsPopupOpen={setIsPopupOpen}
            handleSignOut={handleSignOut}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
          />
        </>
      </ProtectedRoute>
    );
  }

  return (
    <Routes>
      <Route path="/signup" element={renderAuthRoute()} />
      <Route path="/signin" element={renderAuthRoute()} />
      <Route path="/view-news" element={renderViewNewsRoute()} />
      <Route path="/" element={renderMainRoute()} />
      <Route path="/saved-news" element={renderSavedNewsRoute()} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default AppRoutes;
