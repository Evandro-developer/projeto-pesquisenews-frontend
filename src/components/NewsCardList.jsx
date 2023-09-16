import React, { useState } from "react";
import NewsCard from "./NewsCard";

function NewsCardList({ newsData, isSavedNews, query }) {
  const ITEMS_PER_PAGE = 3;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  return (
    <section className="new-card-list">
      <div className="new-card-list__container">
        {!isSavedNews && (
          <h2 className="new-card-list__heading">Procurar resultados</h2>
        )}
        <div className="new-card-list__item">
          {newsData &&
            newsData
              .slice(0, visibleItems)
              .map((newsItem, index) => (
                <NewsCard
                  key={index}
                  source={newsItem.source}
                  title={newsItem.title}
                  publishedAt={newsItem.publishedAt}
                  description={newsItem.description}
                  urlToImage={newsItem.urlToImage}
                  query={query}
                />
              ))}
        </div>
        {newsData && visibleItems < newsData.length && (
          <button className="btn-show-more" onClick={handleShowMore}>
            Mostrar mais
          </button>
        )}
      </div>
    </section>
  );
}

NewsCardList.defaultProps = {
  isSavedNews: false,
};

export default NewsCardList;
