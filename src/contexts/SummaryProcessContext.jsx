import { createContext, useState } from "react";
import { handleGenerateSummary } from "../helpers/apiThirdPartyApiHelpers";
import {
  handleCompleteSummaryProcess,
  handleDeleteSummaryWithStateUpdate,
} from "../helpers/apiSummaryHelpers";

export const SummaryProcessContext = createContext();

export const SummaryProcessProvider = ({
  children,
  savedArticles,
  setSavedArticles,
  selectedArticle,
  setSelectedArticle,
  setSummaryScrollY,
  setErrorLimiter,
}) => {
  const [errorStage, setErrorStage] = useState(null);
  const [isErrorSummary, setIsErrorSummary] = useState(false);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [lastFailedReqArticleId, setLastFailedReqArticleId] = useState("");
  const [lastFailedReqLang, setLastFailedReqLang] = useState("");
  const [lastFailedReqUrl, setLastFailedReqUrl] = useState("");
  const [processingSummaryLang, setProcessingSummaryLang] = useState(null);
  const [preloadSummaryStage, setPreloadSummaryStage] = useState(null);
  const [stageCompleted, setStageCompleted] = useState(false);

  const onSummary = (url, lang, articleId) => {
    setIsErrorSummary(false);
    setIsLoadingSummary(true);
    setSummaryScrollY(true);
    setErrorLimiter(null);
    setLastFailedReqUrl(url);
    setLastFailedReqLang(lang);
    setLastFailedReqArticleId(articleId);
    handleCompleteSummaryProcess(
      url,
      lang,
      articleId,
      handleGenerateSummary,
      savedArticles,
      setSavedArticles,
      setSelectedArticle,
      setPreloadSummaryStage,
      setProcessingSummaryLang,
      setIsErrorSummary,
      setErrorStage,
      setStageCompleted,
      setErrorLimiter,
      // Success callback
      () => {
        setIsErrorSummary(false);
        setIsLoadingSummary(false);
      },
      // Error callback
      (stage) => {
        setIsErrorSummary(true);
        setIsLoadingSummary(false);
        setErrorStage(stage);
      }
    );
  };

  const onDeleteSummary = (articleId, summaryId) => {
    handleDeleteSummaryWithStateUpdate(
      articleId,
      summaryId,
      savedArticles,
      setSavedArticles,
      selectedArticle,
      setSelectedArticle
    );
  };

  return (
    <SummaryProcessContext.Provider
      value={{
        errorStage,
        setErrorStage,
        isErrorSummary,
        setIsErrorSummary,
        isLoadingSummary,
        setIsLoadingSummary,
        lastFailedReqArticleId,
        setLastFailedReqArticleId,
        lastFailedReqLang,
        setLastFailedReqLang,
        lastFailedReqUrl,
        setLastFailedReqUrl,
        processingSummaryLang,
        setProcessingSummaryLang,
        preloadSummaryStage,
        setPreloadSummaryStage,
        stageCompleted,
        setStageCompleted,
        onSummary,
        onDeleteSummary,
      }}
    >
      {children}
    </SummaryProcessContext.Provider>
  );
};
