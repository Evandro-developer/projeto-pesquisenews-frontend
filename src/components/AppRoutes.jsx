import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Header from "./Header";
import Main from "./Main";
import SavedNews from "./SavedNews";

function AppRoutes(props) {
  const {
    isLoggedIn,
    setIsLoggedIn,
    isPopupOpen,
    setIsPopupOpen,
    handleSignOut,
    onSearch,
    isLoading,
    isError,
    newsData,
    savedArticles,
    setSavedArticles,
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
        />
        <Main
          isLoggedIn={isLoggedIn}
          isLoading={isLoading}
          isError={isError}
          newsData={newsData}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
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
          />
          <Main
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            isError={isError}
            newsData={newsData}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
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
      <Route path="/" element={renderMainRoute()} />
      <Route path="/saved-news" element={renderSavedNewsRoute()} />
      <Route path="*" element={<Navigate to="/signin" />} />
    </Routes>
  );
}

export default AppRoutes;
