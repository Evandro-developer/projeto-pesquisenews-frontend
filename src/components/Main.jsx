import NewsCardList from "./NewsCardList";
import Preload from "./Preload";
import About from "./About";

function Main({
  isLoggedIn,
  isLoading,
  isError,
  newsData,
  savedArticles,
  setSavedArticles,
  query,
  setQuery,
  setNewsData,
}) {
  return (
    <div>
      {isLoading || isError ? (
        <Preload isError={isError} />
      ) : (
        newsData &&
        newsData.length > 0 && (
          <NewsCardList
            newsData={newsData}
            isLoggedIn={isLoggedIn}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
            query={query}
            setQuery={setQuery}
            setNewsData={setNewsData}
          />
        )
      )}
      <About />
    </div>
  );
}

export default Main;
