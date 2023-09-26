import React, { useState, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ApiService from "../utils/ApiService";
import NewsCard from "./NewsCard";

function NewsCardList({
  newsData,
  isSavedNews = false,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const ITEMS_PER_PAGE = 3;
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);

  const handleShowMore = () => {
    setVisibleItems((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

  const saveArticle = async (article) => {
    if (!currentUser) {
      return;
    }
    try {
      const response = await ApiService.createArticle(article);
      setSavedArticles((prevArticles) => [
        ...prevArticles,
        ...response.articles,
      ]);
    } catch (error) {
      console.error("Erro ao salvar o artigo:", error);
    }
  };

  const deleteSavedArticle = async (articleId) => {
    if (!currentUser) {
      return;
    }
    try {
      await ApiService.deleteArticle(articleId);
      setSavedArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Erro ao excluir o artigo:", error);
    }
  };

  return (
    <section className="new-card-list">
      <div className="new-card-list__container">
        {!isSavedNews && (
          <h2 className="new-card-list__heading">Procurar resultados</h2>
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
                  isLoggedIn={isLoggedIn}
                  savedArticles={savedArticles}
                  onSaveArticle={saveArticle}
                  onDeleteArticle={deleteSavedArticle}
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

export default NewsCardList;
