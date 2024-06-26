import Navigation from "./Navigation";
import SavedNewsHeader from "./SavedNewsHeader";
import NewsCardList from "./NewsCardList";

function SavedNews({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  savedArticles,
  setSavedArticles,
  onSignOut,
}) {
  return (
    <section className="saved-news">
      <div className="saved-news__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          savedArticles={savedArticles}
          onSignOut={onSignOut}
        />
        <SavedNewsHeader savedArticles={savedArticles} />
        {savedArticles && savedArticles.length > 0 && (
          <NewsCardList
            newsData={savedArticles}
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
