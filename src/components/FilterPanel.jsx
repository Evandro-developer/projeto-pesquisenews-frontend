import { useEffect, useState } from "react";
import useLang from "../hooks/useLang";
import useFilter from "../hooks/useFilter";
import useRouteChecker from "../hooks/useRouteChecker";
import {
  extractAndSortLanguages,
  extractAndSortSources,
  sortedArticleKeywords,
  extractSummaryLanguages,
} from "../helpers/filterPanelHelpers";

const FilterPanel = ({ articles, articleKeywords }) => {
  const {
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
    handleClearFilters,
    noResultsFound,
    handleApplyFilters,
    summaryLanguage,
    setSummaryLanguage,
  } = useFilter();
  const { t } = useLang();
  const { isSavedNewsRoute } = useRouteChecker();
  const [sortedData, setSortedData] = useState({
    languages: [],
    sources: [],
    keywords: [],
    summaryLanguages: [],
  });

  useEffect(() => {
    setSortedData({
      sources: extractAndSortSources(articles),
      languages: extractAndSortLanguages(articles),
      keywords: sortedArticleKeywords(articleKeywords),
      summaryLanguages: extractSummaryLanguages(articles),
    });
  }, [articles, articleKeywords]);

  return (
    <section className="filter-panel">
      <form className="filter-panel__form" onSubmit={handleApplyFilters}>
        <div className="filter-panel__field">
          <div className="filter-panel__field">
            <label>
              {t("filterPanel.sourceLabel")}
              <select
                className="filter-panel__select"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value=""> {t("filterPanel.allSourcesOption")}</option>
                {sortedData.sources.map((source, index) => (
                  <option key={index} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label>
            {t("filterPanel.sortByLabel")}
            <select
              className="filter-panel__select"
              value={dateSort}
              onChange={(e) => setDateSort(e.target.value)}
            >
              <option value="newest"> {t("filterPanel.newestOption")}</option>
              <option value="oldest">{t("filterPanel.oldestOption")}</option>
            </select>
          </label>
        </div>
        {isSavedNewsRoute && (
          <div className="filter-panel__field">
            <label>
              {t("filterPanel.languageLabel")}
              <select
                className="filter-panel__select"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value=""> {t("filterPanel.allOption")}</option>
                {sortedData.languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        {isSavedNewsRoute && (
          <div className="filter-panel__field">
            <label>
              {t("filterPanel.summaryLanguageLabel")}
              <select
                className="filter-panel__select"
                value={summaryLanguage}
                onChange={(e) => setSummaryLanguage(e.target.value)}
              >
                <option value="">{t("filterPanel.allOption")}</option>
                {extractSummaryLanguages(articles).map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        {isSavedNewsRoute && (
          <div className="filter-panel__field">
            <label>
              {t("filterPanel.keywordLabel")}
              <select
                className="filter-panel__select"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              >
                <option value="">{t("filterPanel.allOption")}</option>
                {sortedData.keywords.map((keywordOption, index) => (
                  <option key={index} value={keywordOption}>
                    {keywordOption}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
        <div
          className="filter-panel__field "
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          <label className="filter-panel__publication-date">
            {t("filterPanel.from")}
            <input
              className="filter-panel__font"
              type="date"
              value={publicationDateFrom}
              onChange={(e) => setPublicationDateFrom(e.target.value)}
            />
          </label>
          <label>
            {t("filterPanel.to")}
            <input
              className="filter-panel__font"
              type="date"
              value={publicationDateTo}
              onChange={(e) => setPublicationDateTo(e.target.value)}
            />
          </label>
        </div>
        <button className="btn-filter-panel" type="submit">
          {t("filterPanel.applyFilters")}
        </button>
        <span
          className="filter-panel__clear-filters"
          onClick={handleClearFilters}
        >
          {t("default.clearFilters")}
        </span>
        {noResultsFound && (
          <span className="filter-panel__no-results">
            {t("filterPanel.noResultsFoundMessage")}
          </span>
        )}
      </form>
    </section>
  );
};

export default FilterPanel;
