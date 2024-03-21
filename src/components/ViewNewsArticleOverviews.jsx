import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useLang from "../hooks/useLang";
import useSelectedArticle from "../hooks/useSelectedArticle";
import useCurrentUser from "../hooks/useCurrentUser";
import useSummaryProcess from "../hooks/useSummaryProcess";
import useArticleSavedStatus from "../hooks/useArticleSavedStatus";
import useSaveArticleToAPI from "../hooks/useSaveArticleToAPI";
import LanguageSelector from "./LanguageSelector";
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
  currentArticle,
}) {
  const location = useLocation();
  const { t } = useLang();
  const { currentUser } = useCurrentUser();
  const { selectedArticle, setSelectedArticle } = useSelectedArticle();

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

  const saveArticleIfNotSaved = useCallback(
    async (articleChecked) => {
      if (!isLoggedIn) return;
      if (articleChecked) {
        await saveArticleHookToAPI(articleChecked);
        setIsBookmarkActive(true);
      }
    },
    [isLoggedIn, saveArticleHookToAPI, setIsBookmarkActive]
  );

  const handleBookmarkClick = useCallback(async () => {
    await saveArticleIfNotSaved(articleToSave);
  }, [saveArticleIfNotSaved, articleToSave]);

  const processSummaryForSavedArticle = useCallback(async () => {
    setSelectedArticle(currentArticle);
    if (summaryReq) {
      await handleSummaryProcess(url, summaryReqLang, currentArticle._id);
      setSummaryReq(false);
      setSummaryReqLang("");
    }
  }, [
    setSelectedArticle,
    summaryReq,
    handleSummaryProcess,
    url,
    summaryReqLang,
    setSummaryReq,
    setSummaryReqLang,
    currentArticle,
  ]);

  const processSummaryForUnsavedArticle = useCallback(
    async (articleChecked) => {
      setSelectedArticle(articleChecked);
      if (summaryReq) {
        articleChecked = await handleBookmarkClick(articleChecked);
        if (articleChecked) {
          await handleSummaryProcess(url, summaryReqLang, articleChecked._id);
          setSummaryReq(false);
          setSummaryReqLang("");
        }
      }
    },
    [
      setSelectedArticle,
      summaryReq,
      handleSummaryProcess,
      url,
      summaryReqLang,
      setSummaryReq,
      setSummaryReqLang,
      handleBookmarkClick,
    ]
  );

  useEffect(
    () => {
      const processArticle = currentArticle
        ? processSummaryForSavedArticle(currentArticle)
        : processSummaryForUnsavedArticle(articleToSave);
      processArticle.then(() => {
        if (preloadRef.current) {
          preloadRef.current.scrollIntoView({ behavior: "smooth" });
        }
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      url,
      summaryReq,
      summaryReqLang,
      articleToSave,
      selectedArticle,
      preloadRef,
    ]
  );

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
