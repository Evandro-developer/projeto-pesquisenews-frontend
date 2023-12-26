import { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import NewsCard from "./NewsCard";
import { localStorageManager } from "../helpers/localStorageHelpers";

function NewsCardList({
  newsData,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
  query,
  setQuery,
  setNewsData,
}) {
  const location = useLocation();
  const { t } = useContext(LangContext);

  const [firstArticleLang, setFirstArticleLang] = useState("");
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/signin" ||
    location.pathname === "/signup";

  const ITEMS_PER_PAGE = 3;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const handleClearSearch = () => {
    localStorageManager.removeNewsData();
    setNewsData([]);
    setQuery("");
  };

  useEffect(() => {
    const newsDataFromLocalStorage = localStorageManager.getNewsData();
    if (
      newsDataFromLocalStorage &&
      newsDataFromLocalStorage.articles &&
      newsDataFromLocalStorage.articles.length > 0
    ) {
      const extractedLang = newsDataFromLocalStorage.articles[0].lang;
      setFirstArticleLang(extractedLang);
    }
  }, [newsData]);

  return (
    <section className="new-card-list">
      <div className="new-card-list__container">
        {isHomePage && (
          <div className="new-card-list__content-heading">
            <h2 className="new-card-list__heading">{t("newCardList.title")}</h2>
            {query && (
              <span
                className="new-card-list__clear-search"
                onClick={handleClearSearch}
              >
                {t("newCardList.clearSearch", {
                  query: query,
                  lang: firstArticleLang.toUpperCase(),
                })}
              </span>
            )}
          </div>
        )}
        <div className="new-card-list__item">
          {newsData &&
            newsData.length > 0 &&
            newsData
              .slice(0, visibleItems)
              .map((newsItem) => (
                <NewsCard
                  key={newsItem.url}
                  keyword={newsItem.keyword}
                  title={newsItem.title}
                  description={newsItem.description}
                  publishedAt={newsItem.publishedAt}
                  source={newsItem.source}
                  url={newsItem.url}
                  urlToImage={newsItem.urlToImage}
                  lang={newsItem.lang}
                  isLoggedIn={isLoggedIn}
                  savedArticles={savedArticles}
                  setSavedArticles={setSavedArticles}
                />
              ))}
        </div>
        {newsData && visibleItems < newsData.length && (
          <button className="btn-show-more" onClick={handleShowMore}>
            {t("newCardList.btnShowMore")}
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
