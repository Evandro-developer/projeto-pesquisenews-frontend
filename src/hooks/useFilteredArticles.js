import { useContext, useEffect } from "react";
import { FilterContext } from "../contexts/FilterContext";

const useFilteredArticles = (isSavedNewsRoute) => {
  const {
    filteredHomeArticles,
    setFilteredHomeArticles,
    filteredSavedArticles,
    setFilteredSavedArticles,
    persistFilters,
  } = useContext(FilterContext);

  useEffect(() => {
    if (persistFilters) {
      const storedArticlesKey = isSavedNewsRoute
        ? "filteredSavedArticles"
        : "filteredHomeArticles";
      const storedArticles = localStorage.getItem(storedArticlesKey);
      if (storedArticles) {
        const articles = JSON.parse(storedArticles);
        if (isSavedNewsRoute) {
          setFilteredSavedArticles(articles);
        } else {
          setFilteredHomeArticles(articles);
        }
      }
    }
  }, [
    isSavedNewsRoute,
    persistFilters,
    setFilteredHomeArticles,
    setFilteredSavedArticles,
  ]);

  useEffect(() => {
    const displayedArticles = isSavedNewsRoute
      ? filteredSavedArticles
      : filteredHomeArticles;
    const storageKey = isSavedNewsRoute
      ? "filteredSavedArticles"
      : "filteredHomeArticles";
    localStorage.setItem(storageKey, JSON.stringify(displayedArticles));
  }, [filteredHomeArticles, filteredSavedArticles, isSavedNewsRoute]);
};

export default useFilteredArticles;
