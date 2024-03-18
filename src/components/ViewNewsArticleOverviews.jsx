import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LangContext } from "../contexts/LanguageContext";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";
import { useSummaryProcess } from "../contexts/SummaryProcessContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import LanguageSelector from "./LanguageSelector";
import useArticleSavedStatus from "../hooks/useArticleSavedStatus";
import useSaveArticleToAPI from "../hooks/useSaveArticleToAPI";
import ViewNewsArticleOverview from "./ViewNewsArticleOverview";

function ViewNewsArticleOverviews({
  onImageClick,
  isLoggedIn,
  savedArticles,
  setSavedArticles,
  renderLangOptions,
  someSummariesCompleted,
  allSummariesCompleted,
  preloadRef,
}) {
  const location = useLocation();
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);
  const { selectedArticle, setSelectedArticle } = useContext(
    SelectedArticleContext
  );

  const [summaryReqLang, setSummaryReqLang] = useState("");
  const [summaryReq, setSummaryReq] = useState(false);

  const articleToSave = location.state;
  const title = articleToSave.title;
  const url = articleToSave.url;

  const { handleSummaryProcess } = useSummaryProcess();
  const { isBookmarkActive, setIsBookmarkActive } = useArticleSavedStatus(
    savedArticles,
    url,
    title
  );
  const saveArticleHookToAPI = useSaveArticleToAPI(
    setSavedArticles,
    currentUser
  );

  const saveArticleIfNotSaved = async (articleChecked) => {
    if (!isLoggedIn) return;
    if (articleChecked) {
      await saveArticleHookToAPI(articleChecked);
      setIsBookmarkActive(true);
    }
  };

  const handleBookmarkClick = async () =>
    await saveArticleIfNotSaved(articleToSave);

  const processSummaryForSavedArticle = async (currentArticle) => {
    setSelectedArticle(currentArticle);
    if (summaryReq) {
      await handleSummaryProcess(url, summaryReqLang, currentArticle._id);
      setSummaryReq(false);
      setSummaryReqLang("");
    }
  };

  const processSummaryForUnsavedArticle = async (articleChecked) => {
    setSelectedArticle(articleChecked);
    if (summaryReq) {
      articleChecked = await handleBookmarkClick(articleChecked);
      if (articleChecked) {
        await handleSummaryProcess(url, summaryReqLang, articleChecked._id);
        setSummaryReq(false);
        setSummaryReqLang("");
      }
    }
  };

  useEffect(() => {
    const currentArticle = savedArticles.find((article) => article.url === url);
    const processArticle = currentArticle
      ? processSummaryForSavedArticle(currentArticle)
      : processSummaryForUnsavedArticle(articleToSave);
    processArticle.then(() => {
      if (preloadRef.current) {
        preloadRef.current.scrollIntoView({ behavior: "smooth" });
      }
    });
  }, [url, summaryReq, summaryReqLang, selectedArticle, preloadRef]);

  const renderHeading = () => {
    let headerContent;
    if (allSummariesCompleted) {
      headerContent = t("viewNewsArticleOverviews.allLanguagesExplored");
    } else {
      headerContent = (
        <>
          {someSummariesCompleted
            ? t("viewNewsArticleOverviews.partialLanguagesExplored")
            : t("viewNewsArticleOverviews.articleInsightsWithAI")}{" "}
          <LanguageSelector
            value={summaryReqLang}
            onChange={(e) => {
              const newLang = e.target.value;
              if (newLang !== "") {
                setSummaryReqLang(newLang);
                setSummaryReq(true);
              }
            }}
            className="view-news-article-overviews__lang-dropdown"
            renderOptions={renderLangOptions()}
            iconType="globe"
          />
        </>
      );
    }

    return (
      <h3 className="view-news-article-overviews__heading">{headerContent}</h3>
    );
  };

  return (
    <section className="view-news-article-overviews">
      <div className="view-news-article-overviews__container">
        {isLoggedIn && renderHeading()}
        <ViewNewsArticleOverview
          onImageClick={onImageClick}
          isLoggedIn={isLoggedIn}
          handleBookmarkClick={handleBookmarkClick}
          isBookmarkActive={isBookmarkActive}
        />
      </div>
    </section>
  );
}

export default ViewNewsArticleOverviews;
