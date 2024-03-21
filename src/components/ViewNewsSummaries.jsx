import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useLang from "../hooks/useLang";
import useSelectedArticle from "../hooks/useSelectedArticle";
import useSummaryProcess from "../hooks/useSummaryProcess";
import { useScrollToTop } from "../hooks/useScrollToTop";
import iconTrash from "../images/icon_trash.svg";
import iconArrowScrollToTop from "../images/scroll_top.svg";
import Preload from "./Preload";
import ViewNewsSummary from "./ViewNewsSummary";

function ViewNewsSummaries({ errorLimiter, preloadRef, savedArticles }) {
  const location = useLocation();
  const { t, lang: globalLang } = useLang();
  const { selectedArticle } = useSelectedArticle();
  const {
    handleDeleteSummary,
    processingSummaryLang,
    isLoadingSummary,
    setIsLoadingSummary,
    isErrorSummary,
    setIsErrorSummary,
  } = useSummaryProcess();

  const [selectedLang, setSelectedLang] = useState(null);
  const articleData = location.state;
  const source = articleData.source;
  const hasSummaries = selectedArticle.summaries.length > 0;
  const { isScrollVisible, scrollToTop } = useScrollToTop(
    selectedArticle.summaries.length ?? 0,
    hasSummaries,
    0
  );

  const toggleView = useCallback(
    (lang) => {
      if (lang) {
        setIsLoadingSummary(false);
        setSelectedLang(lang);
        setIsErrorSummary(false);
      } else {
        setIsLoadingSummary(true);
        setSelectedLang(null);
      }
    },
    [setIsLoadingSummary, setSelectedLang, setIsErrorSummary]
  );

  useEffect(() => {
    const latestSummary =
      selectedArticle.summaries[selectedArticle.summaries.length - 1];
    if (latestSummary) {
      setSelectedLang(latestSummary.lang);
    }
  }, [selectedArticle.summaries]);

  useEffect(() => {
    const articleLanguages = selectedArticle
      ? selectedArticle.summaries.map((summary) => summary.lang)
      : [];
    if (selectedLang === null && selectedArticle) {
      if (articleLanguages.includes(globalLang)) {
        setSelectedLang(globalLang);
      } else if (articleLanguages.length > 0) {
        setSelectedLang(articleLanguages[0]);
      } else {
        setSelectedLang(null);
      }
    }
    if (selectedLang && !articleLanguages.includes(selectedLang)) {
      setSelectedLang(articleLanguages.length > 0 ? articleLanguages[0] : null);
    }
  }, [savedArticles, selectedArticle, globalLang, selectedLang]);

  const languageOptions = useMemo(() => {
    const uniqueSortedLangs = selectedArticle.summaries
      .map((summary) => summary.lang)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a.localeCompare(b));
    return uniqueSortedLangs.map((lang, index, sortedLangs) => (
      <React.Fragment key={lang}>
        <span
          className={`view-news-summaries__lang ${
            selectedLang === lang ? "selected" : ""
          }`}
          onClick={() => toggleView(lang)}
        >
          {lang.toUpperCase()}
        </span>
        {(index < sortedLangs.length - 1 || processingSummaryLang) && " | "}
      </React.Fragment>
    ));
  }, [
    selectedArticle.summaries,
    selectedLang,
    processingSummaryLang,
    toggleView,
  ]);

  const preloadOrError = useMemo(
    () => isLoadingSummary || isErrorSummary,
    [isLoadingSummary, isErrorSummary]
  );

  const summarizedArticles = useMemo(() => {
    if (preloadOrError) {
      return (
        <Preload source={source} ref={preloadRef} errorLimiter={errorLimiter} />
      );
    } else {
      return selectedArticle.summaries
        .filter((summary) => summary.lang === selectedLang)
        .map((summary, index) => (
          <div key={`summary-${index}`} className="summary-item">
            <ViewNewsSummary summary={summary} />
            <div className="view-news-summaries__delete-summary">
              <img
                src={iconTrash}
                alt={t("viewNewsSummaries.altIconTrash")}
                className="view-news-summaries__delete-summary-icon"
                onClick={() =>
                  handleDeleteSummary(selectedArticle._id, summary._id)
                }
              />
              <span className="view-news-summaries__delete-summary-text">
                {t("viewNewsSummaries.deleteSummaryText")}
              </span>
            </div>
          </div>
        ));
    }
  }, [
    preloadOrError,
    selectedArticle.summaries,
    selectedLang,
    source,
    preloadRef,
    errorLimiter,
    t,
    handleDeleteSummary,
    selectedArticle._id,
  ]);

  return (
    <section className="view-news-summaries">
      <div className="view-news-summaries__container">
        <div className="view-news-summaries__lang-switch">
          {languageOptions}
          {processingSummaryLang && (
            <span
              className="view-news-summaries__lang globe"
              onClick={() => toggleView(null)}
            >
              {"🌐"}
            </span>
          )}
        </div>
        {summarizedArticles}
        {isScrollVisible && (
          <picture onClick={scrollToTop} className="btn-scroll-top">
            <img src={iconArrowScrollToTop} alt={t("default.iconArrow")} />
          </picture>
        )}
      </div>
    </section>
  );
}

export default ViewNewsSummaries;
