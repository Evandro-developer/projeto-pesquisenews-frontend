import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import { FilterContext } from "../contexts/FilterContext";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";
import useRouteChecker from "../hooks/useRouteChecker";
import useFilteredArticles from "../hooks/useFilteredArticles";
import { useArticleDisplay } from "../hooks/useArticleDisplay";
import { useScrollToTop } from "../hooks/useScrollToTop";
import NewsCard from "./NewsCard";
import FilterPanelDisplay from "./FilterPanelDisplay";
import iconTrash from "../images/icon_trash.svg";
import iconArrowScrollToTop from "../images/scroll_top.svg";

function NewsCardList({
  newsData,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
  query,
  setQuery,
  setNewsData,
  searchScrollY,
  setSearchScrollY,
}) {
  const { t } = useContext(LangContext);
  const { selectedArticle, setSelectedArticle } = useContext(
    SelectedArticleContext
  );
  const {
    showFilterPanel,
    setShowFilterPanel,
    filteredHomeArticles,
    setFilteredHomeArticles,
    filteredSavedArticles,
    handleApplyFilters,
    onClearFilteredHomeArticles,
    onClearFilteredSavedArticles,
  } = useContext(FilterContext);

  const { isSavedNewsRoute, isHomePage } = useRouteChecker();
  const currentArticles = isHomePage
    ? newsData || filteredHomeArticles
    : savedArticles || filteredSavedArticles;
  const { isScrollVisible, scrollToTop } = useScrollToTop(
    currentArticles.length
  );
  useFilteredArticles(isSavedNewsRoute);
  const {
    handleShowMore,
    handleClearSearch,
    articlesToRender,
    visibleItems,
    firstArticleLang,
    articleKeywords,
    lastNewsCardRef,
  } = useArticleDisplay(
    isHomePage,
    isSavedNewsRoute,
    newsData,
    savedArticles,
    filteredHomeArticles,
    filteredSavedArticles,
    setNewsData,
    setFilteredHomeArticles,
    setQuery,
    searchScrollY,
    setSearchScrollY
  );

  const renderNewsCard = (newsItem, index) =>
    index < visibleItems && (
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
        selectedArticle={selectedArticle}
        setSelectedArticle={setSelectedArticle}
        lastCardRef={
          index === articlesToRender.length - 1 ? lastNewsCardRef : null
        }
      />
    );

  return (
    <section className="new-card-list">
      <div className="new-card-list__container">
        {isHomePage && (
          <div className="new-card-list__main-container">
            <h3 className="new-card-list__main-heading">
              {t("newCardList.title")}
            </h3>
            {query && (
              <div className="new-card-list__main-clear-search-container">
                <img
                  src={iconTrash}
                  alt={t("newCardList.altIconTrashClear")}
                  className="new-card-list__clear-search-icon"
                  onClick={handleClearSearch}
                />
                <span className="new-card-list__main-clear-search">
                  {t("newCardList.clearSearch", {
                    query: query,
                    lang: firstArticleLang.toUpperCase(),
                  })}
                </span>
              </div>
            )}
          </div>
        )}
        {isHomePage && (
          <FilterPanelDisplay
            showFilterPanel={showFilterPanel}
            setShowFilterPanel={setShowFilterPanel}
            newsData={newsData}
            filteredArticles={filteredHomeArticles}
            articleKeywords={articleKeywords}
            isHomePage={isHomePage}
            handleApplyFilters={handleApplyFilters}
            clearFilteredArticles={onClearFilteredHomeArticles}
          />
        )}
        {isSavedNewsRoute && (
          <FilterPanelDisplay
            showFilterPanel={showFilterPanel}
            setShowFilterPanel={setShowFilterPanel}
            savedArticles={savedArticles}
            filteredArticles={filteredSavedArticles}
            articleKeywords={articleKeywords}
            isSavedNewsRoute={isSavedNewsRoute}
            handleApplyFilters={handleApplyFilters}
            clearFilteredArticles={onClearFilteredSavedArticles}
          />
        )}
        <div className="new-card-list__item" ref={lastNewsCardRef}>
          {articlesToRender.map(renderNewsCard)}
        </div>
        {articlesToRender.length > visibleItems && (
          <button className="btn-show-more" onClick={handleShowMore}>
            {t("newCardList.btnShowMore")}
          </button>
        )}
        {isScrollVisible && (
          <picture onClick={scrollToTop} className="btn-scroll-top">
            <img src={iconArrowScrollToTop} alt={t("default.iconArrow")} />
          </picture>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;
