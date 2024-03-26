import { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSelectedArticle from "../hooks/useSelectedArticle";
import { useSummariesArticle } from "../hooks/useSummariesArticle";
import useSummaryProcess from "../hooks/useSummaryProcess";
import { languages } from "../helpers/localesHelpers";
import NAV_PATHS from "../utils/navPaths";
import Navigation from "./Navigation";
import ViewNewsHeader from "./ViewNewsheader";
import ViewNewsArticleOverviews from "./ViewNewsArticleOverviews";
import ViewNewsSummaries from "./ViewNewsSummaries";
import ImagePopup from "./ImagePopup";

function ViewNews({
  isLoggedIn,
  setIsLoggedIn,
  setIsPopupOpen,
  savedArticles,
  setSavedArticles,
  isClosing,
  setIsClosing,
  errorLimiter,
  preloadRef,
  onSignOut,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArticle, setSelectedArticle } = useSelectedArticle();
  const {
    setPreloadSummaryStage,
    setProcessingSummaryLang,
    setIsErrorSummary,
    setErrorStage,
    setIsLoadingSummary,
    isLoadingSummary,
  } = useSummaryProcess();
  const { newAvailableLangs, someSummariesCompleted, allSummariesCompleted } =
    useSummariesArticle(languages);

  const [selectedImage, setSelectedImage] = useState(null);
  const articleData = location.state;
  const url = articleData?.url;

  const handleImageClick = (urlToImage) => {
    setSelectedImage(urlToImage);
  };

  const renderLangOptions = () => {
    return newAvailableLangs.map((langOption) => (
      <option key={langOption} value={langOption}>
        {langOption.toUpperCase()}
      </option>
    ));
  };

  useEffect(() => {
    return () => {
      setPreloadSummaryStage(null);
      setProcessingSummaryLang(null);
      setIsErrorSummary(false);
      setErrorStage(null);
      setIsLoadingSummary(false);
    };
  }, [
    setPreloadSummaryStage,
    setProcessingSummaryLang,
    setIsErrorSummary,
    setErrorStage,
    setIsLoadingSummary,
    selectedArticle,
  ]);

  const currentArticle = useMemo(() => {
    return Array.isArray(savedArticles)
      ? savedArticles.find((article) => article.url === url)
      : undefined;
  }, [savedArticles, url]);

  useEffect(() => {
    if (currentArticle) {
      setSelectedArticle(currentArticle);
    } else {
      setSelectedArticle(articleData);
    }
  }, [url, currentArticle, articleData, selectedArticle, setSelectedArticle]);

  useEffect(() => {
    if (!articleData) {
      navigate(NAV_PATHS.MAIN);
    } else {
      setSelectedArticle(articleData);
    }
  }, [articleData, navigate, setSelectedArticle]);

  if (!articleData) {
    return null;
  }

  const shouldShowViewNewsSummaries =
    (selectedArticle &&
      selectedArticle.summaries &&
      selectedArticle.summaries.length > 0) ||
    isLoadingSummary;

  return (
    <section className="view-news">
      <div className="view-news__container">
        <Navigation
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsPopupOpen={setIsPopupOpen}
          onSignOut={onSignOut}
        />
        <ViewNewsHeader isLoggedIn={isLoggedIn} />
        <ViewNewsArticleOverviews
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          renderLangOptions={renderLangOptions}
          someSummariesCompleted={someSummariesCompleted}
          allSummariesCompleted={allSummariesCompleted}
          preloadRef={preloadRef}
          onImage={handleImageClick}
          currentArticle={currentArticle}
        />
        {selectedImage && (
          <ImagePopup
            selectedImage={selectedImage}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            onClose={() => setSelectedImage(null)}
          />
        )}

        {shouldShowViewNewsSummaries && (
          <ViewNewsSummaries
            errorLimiter={errorLimiter}
            preloadRef={preloadRef}
            savedArticles={savedArticles}
          />
        )}
      </div>
    </section>
  );
}

export default ViewNews;
