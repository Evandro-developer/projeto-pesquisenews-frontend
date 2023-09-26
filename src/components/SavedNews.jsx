import React from "react";
import Navigation from "./Navigation";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCardList from "./NewsCardList";

function SavedNews({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  onLogout,
  handleSignOut,
  savedArticles,
  setSavedArticles,
}) {
  return (
    <section className="saved-news">
      <div className="saved-news__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          onLogout={onLogout}
          handleSignOut={handleSignOut}
          savedArticles={savedArticles}
        />
        <SavedNewsHeader savedArticles={savedArticles} />
        {savedArticles && savedArticles.length > 0 && (
          <NewsCardList
            newsData={savedArticles}
            isSavedNews={true}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
          />
        )}
      </div>
    </section>
  );
}

export default SavedNews;
