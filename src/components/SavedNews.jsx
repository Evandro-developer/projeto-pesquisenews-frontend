import React from "react";
import Navigation from "./Navigation";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCardList from "./NewsCardList";

function SavedNews({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  onLogout,
  newsData,
  userName,
  query,
}) {
  return (
    <section className="saved-news">
      <div className="saved-news__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          onLogout={onLogout}
          userName={userName}
        />
        <SavedNewsHeader query={query} userName={userName} />
        <NewsCardList
          isLoggedIn={isLoggedIn}
          newsData={newsData}
          isSavedNews={true}
          query={query}
        />
      </div>
    </section>
  );
}

export default SavedNews;
