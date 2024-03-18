import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";
import { useSummaryProcess } from "../contexts/SummaryProcessContext";
import { useSummariesArticle } from "../hooks/useSummariesArticle";
import { languages } from "../helpers/localesHelpers";
import NAV_PATHS from "../utils/navPaths";
import Navigation from "./Navigation";
import ViewNewsHeader from "./ViewNewsHeader";
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
  handleSignOut,
  onLogout,
  preloadRef,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedArticle, setSelectedArticle } = useContext(
    SelectedArticleContext
  );

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
  }, [selectedArticle]);

  useEffect(() => {
    const currentArticle = savedArticles.find((article) => article.url === url);
    if (currentArticle) {
      setSelectedArticle(currentArticle);
    } else {
      setSelectedArticle(articleData);
    }
  }, [url, savedArticles, selectedArticle]);

  useEffect(() => {
    if (!articleData) {
      navigate(NAV_PATHS.MAIN);
    } else {
      setSelectedArticle(articleData);
    }
  }, [articleData, navigate]);

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
          onLogout={onLogout}
          handleSignOut={handleSignOut}
          savedArticles={savedArticles}
        />
        <ViewNewsHeader isLoggedIn={isLoggedIn} />
        <ViewNewsArticleOverviews
          onImageClick={handleImageClick}
          isLoggedIn={isLoggedIn}
          savedArticles={savedArticles}
          setSavedArticles={setSavedArticles}
          renderLangOptions={renderLangOptions}
          someSummariesCompleted={someSummariesCompleted}
          allSummariesCompleted={allSummariesCompleted}
          preloadRef={preloadRef}
        />
        {selectedImage && (
          <ImagePopup
            selectedImage={selectedImage}
            isClosing={isClosing}
            setIsClosing={setIsClosing}
            onCloseImageClick={() => setSelectedImage(null)}
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
