import { createContext, useState } from "react";
import useRouteChecker from "../hooks/useRouteChecker";

import {
  getCurrentArticles,
  filterAndSortArticles,
  checkResults,
  handleResults,
  applyFilterResults,
  clearFilteredHomeArticles,
  clearFilteredSavedArticles,
} from "../helpers/filterContextHelpers";

export const FilterContext = createContext();

export const FilterProvider = ({ children, articles }) => {
  const [source, setSource] = useState("");
  const [dateSort, setDateSort] = useState("newest");
  const [language, setLanguage] = useState("");
  const [keyword, setKeyword] = useState("");
  const [publicationDateFrom, setPublicationDateFrom] = useState("");
  const [publicationDateTo, setPublicationDateTo] = useState("");
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const [filteredHomeArticles, setFilteredHomeArticles] = useState([]);
  const [filteredSavedArticles, setFilteredSavedArticles] = useState([]);
  const [persistFilters, setPersistFilters] = useState(true);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [summaryLanguage, setSummaryLanguage] = useState("");

  const { isHomePage, isSavedNewsRoute } = useRouteChecker();

  const handleApplyFilters = (evt) => {
    evt.preventDefault();

    const currentArticles = getCurrentArticles(isSavedNewsRoute, articles);

    const filters = {
      source,
      dateSort,
      language,
      keyword,
      publicationDateFrom,
      publicationDateTo,
      summaryLanguage,
    };

    const filteredArticles = filterAndSortArticles(
      currentArticles,
      filters,
      dateSort
    );

    const hasResults = filteredArticles.length > 0;

    checkResults(hasResults, setNoResultsFound);

    applyFilterResults(
      hasResults,
      filteredArticles,
      filters,
      isHomePage,
      setFilteredHomeArticles,
      setFilteredSavedArticles,
      setShowFilterPanel,
      handleClearFilters
    );

    handleResults(
      hasResults,
      filteredArticles,
      filters,
      isHomePage,
      setFilteredHomeArticles,
      setFilteredSavedArticles
    );
  };

  const handleClearFilters = () => {
    setDateSort("newest");
    setKeyword("");
    setLanguage("");
    setPublicationDateFrom("");
    setPublicationDateTo("");
    setSource("");
    setNoResultsFound(false);
    setSummaryLanguage("");
  };

  const onClearFilteredHomeArticles = () => {
    clearFilteredHomeArticles(setFilteredHomeArticles);
  };

  const onClearFilteredSavedArticles = () =>
    clearFilteredSavedArticles(setFilteredSavedArticles);

  return (
    <FilterContext.Provider
      value={{
        source,
        setSource,
        dateSort,
        setDateSort,
        language,
        setLanguage,
        keyword,
        setKeyword,
        publicationDateFrom,
        setPublicationDateFrom,
        publicationDateTo,
        setPublicationDateTo,
        showFilterPanel,
        setShowFilterPanel,
        noResultsFound,
        setNoResultsFound,
        filteredHomeArticles,
        setFilteredHomeArticles,
        filteredSavedArticles,
        setFilteredSavedArticles,
        persistFilters,
        setPersistFilters,
        filtersChanged,
        setFiltersChanged,
        handleApplyFilters,
        handleClearFilters,
        onClearFilteredHomeArticles,
        onClearFilteredSavedArticles,
        summaryLanguage,
        setSummaryLanguage,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
