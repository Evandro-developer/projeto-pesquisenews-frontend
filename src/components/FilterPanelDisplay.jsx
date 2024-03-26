import AnimateHeight from "react-animate-height";
import useLang from "../hooks/useLang";
import useRouteChecker from "../hooks/useRouteChecker";
import useCloseFilterPanel from "../hooks/useCloseFilterPanel";
import FilterPanel from "./FilterPanel";
import iconFilter from "../images/icon_filter.svg";

function FilterPanelDisplay({
  showFilterPanel,
  setShowFilterPanel,
  filteredArticles,
  articleKeywords,
  savedArticles,
  newsData,
  handleApplyFilters,
  clearFilteredArticles,
}) {
  const { t } = useLang();
  const { isSavedNewsRoute } = useRouteChecker();

  const startClosingAnimation = () => {
    setShowFilterPanel("closing");
    setTimeout(() => {
      setShowFilterPanel(false);
    }, 200);
  };

  const handleButtonClick = () =>
    showFilterPanel ? startClosingAnimation() : setShowFilterPanel(true);

  useCloseFilterPanel(showFilterPanel, startClosingAnimation);

  return (
    <div className="filter-panel-display">
      <div className="filter-panel-display__content">
        <div className="filter-panel-display__item">
          <h3 className="filter-panel-display__heading">
            {t("filterPanelDisplay.filter")}
          </h3>
          <picture className="filter-panel-display__btn">
            <img
              src={iconFilter}
              onClick={handleButtonClick}
              alt={t("filterPanelDisplay.altFilterBtn")}
              loading="lazy"
            />
          </picture>
        </div>
        {filteredArticles.length > 0 && (
          <span
            className="filter-panel-display__clear-filters"
            onClick={clearFilteredArticles}
          >
            {t("filterPanelDisplay.clearFilteredArticles")}
          </span>
        )}

        <div>
          {showFilterPanel && (
            <AnimateHeight
              className={`${
                showFilterPanel === "closing"
                  ? "filter-panel-display__exit"
                  : "filter-panel-display__enter"
              }`}
              height={"auto"}
            >
              <FilterPanel
                articles={isSavedNewsRoute ? savedArticles : newsData}
                articleKeywords={articleKeywords}
                handleApplyFilters={handleApplyFilters}
                showFilterPanel={showFilterPanel}
                setShowFilterPanel={setShowFilterPanel}
              />
            </AnimateHeight>
          )}
        </div>
      </div>
    </div>
  );
}

export default FilterPanelDisplay;
