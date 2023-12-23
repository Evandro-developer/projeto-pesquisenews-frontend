import { useState, useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import NewsCard from "./NewsCard";

function NewsCardList({
  newsData,
  isSavedNews = false,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
}) {
  const { t } = useContext(LangContext);

  const ITEMS_PER_PAGE = 3;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <section className="new-card-list">
      <div className="new-card-list__container">
        {!isSavedNews && (
          <h2 className="new-card-list__heading"> {t("newCardList.title")}</h2>
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
