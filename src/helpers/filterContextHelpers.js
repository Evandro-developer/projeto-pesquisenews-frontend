import { localStorageManager } from "./localStorageHelpers";

export const getCurrentArticles = (isSavedNewsRoute, articles) => {
  return isSavedNewsRoute ? articles.savedArticles : articles.newsData;
};

export const filterAndSortArticles = (currentArticles, filters, dateSort) => {
  return currentArticles
    .filter(
      (article) =>
        (!filters.source || article.source === filters.source) &&
        (!filters.keyword || article.keyword.includes(filters.keyword)) &&
        (!filters.language || article.lang === filters.language) &&
        (!filters.publicationDateFrom ||
          new Date(article.publishedAt) >=
            new Date(filters.publicationDateFrom + "T00:00:00Z")) &&
        (!filters.publicationDateTo ||
          new Date(article.publishedAt) <=
            new Date(filters.publicationDateTo + "T23:59:59Z")) &&
        (!filters.summaryLanguage ||
          article.summaries.some(
            (summary) => summary.lang === filters.summaryLanguage
          ))
    )
    .sort((a, b) => {
      if (dateSort === "newest") {
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      } else {
        return new Date(a.publishedAt) - new Date(b.publishedAt);
      }
    });
};

export const checkResults = (hasResults, setNoResultsFound) => {
  setNoResultsFound(!hasResults);
};

export const handleResults = (
  hasResults,
  filteredArticles,
  filtersToSave,
  isHomePage,
  setFilteredHomeArticles,
  setFilteredSavedArticles
) => {
  if (hasResults) {
    if (isHomePage) {
      setFilteredHomeArticles(filteredArticles);
      localStorageManager.saveNewsFilters(filtersToSave);
    } else {
      setFilteredSavedArticles(filteredArticles);
      localStorageManager.saveSavedArticleFilters(filtersToSave);
    }
  }
};

export const applyFilterResults = (
  hasResults,
  filteredArticles,
  filters,
  isHomePage,
  setFilteredHomeArticles,
  setFilteredSavedArticles,
  setShowFilterPanel,
  handleClearFilters
) => {
  if (hasResults) {
    handleResults(
      filteredArticles,
      filters,
      isHomePage,
      setFilteredHomeArticles,
      setFilteredSavedArticles,
      localStorageManager
    );
    setShowFilterPanel(false);
    handleClearFilters();
  } else {
    setShowFilterPanel(true);
  }
};

export const clearFilteredHomeArticles = (setFilteredHomeArticles) => {
  localStorageManager.removeNewsFilters();
  setFilteredHomeArticles([]);
};

export const clearFilteredSavedArticles = (setFilteredSavedArticles) => {
  localStorageManager.removeSavedArticleFilters();
  setFilteredSavedArticles([]);
};
