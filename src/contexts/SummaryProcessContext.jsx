import React, { createContext, useContext, useState } from "react";
import { handleGenerateSummary } from "../helpers/apiThirdPartyApiHelpers";
import {
  handleCompleteSummaryProcess,
  handleDeleteSummaryWithStateUpdate,
} from "../helpers/apiSummaryHelpers";

const SummaryProcessContext = createContext();

export const useSummaryProcess = () => useContext(SummaryProcessContext);

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

  const handleSummaryProcess = (url, lang, articleId) => {
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
      // Success callback - called when summary processing completes successfully
      // Callback de sucesso - chamado quando o processamento do resumo é concluído com sucesso
      () => {
        setIsErrorSummary(false);
        setIsLoadingSummary(false);
      },
      // Error callback - called when an error occurs during summary processing
      // Callback de erro - chamado quando ocorre um erro durante o processamento do resumo
      (stage) => {
        setIsErrorSummary(true);
        setIsLoadingSummary(false);
        setErrorStage(stage);
      }
    );
  };

  const handleDeleteSummary = (articleId, summaryId) => {
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
        handleSummaryProcess,
        handleDeleteSummary,
      }}
    >
      {children}
    </SummaryProcessContext.Provider>
  );
};
