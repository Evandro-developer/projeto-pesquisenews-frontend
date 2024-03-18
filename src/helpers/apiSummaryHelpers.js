import ApiService from "../utils/ApiService";

export const handleExtractContent = async (
  url,
  lang,
  onExtractionSuccess,
  onExtractionError
) => {
  try {
    const extractedContent = await ApiService.extractContent(url, lang);
    onExtractionSuccess(extractedContent);
  } catch (error) {
    onExtractionError(
      "extracting",
      error.message || "Error while extracting content."
    );
  }
};

export const handleAddSummaryToArticle = async (
  articleId,
  summary,
  savedArticles,
  setSavedArticles,
  setSelectedArticle,
  onAddSummarySuccess,
  onAddSummaryError
) => {
  try {
    const response = await ApiService.addSummaryToArticle(articleId, summary);
    const updatedArticles = savedArticles.map((article) =>
      article._id === response.article._id ? response.article : article
    );
    setSavedArticles(updatedArticles);
    setSelectedArticle(updatedArticles);
    onAddSummarySuccess(response.article);
  } catch (error) {
    onAddSummaryError(
      "saving",
      error.message || "Error while adding summary to the article."
    );
  }
};

const waitForWithActions = async (
  milliseconds,
  preWaitAction,
  postWaitAction
) => {
  if (preWaitAction) preWaitAction();
  await new Promise((resolve) => setTimeout(resolve, milliseconds));
  if (postWaitAction) postWaitAction();
};

// Function to handle the delay and actions after completing a stage with a customizable delay time
// Função para lidar com o atraso e as ações após completar uma etapa com um tempo de atraso personalizável
const handleStageCompletionDelay = async (setStageCompleted, milliseconds) => {
  await waitForWithActions(
    milliseconds,
    () => setStageCompleted(true),
    () => setStageCompleted(false)
  );
};

export const handleCompleteSummaryProcess = async (
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
  setErrorLimiter
) => {
  setProcessingSummaryLang(lang);

  try {
    setPreloadSummaryStage("extracting");
    const extractedContent = await new Promise((resolve, reject) => {
      handleExtractContent(url, lang, resolve, (stage, message) =>
        reject({ stage, message })
      );
    });

    setPreloadSummaryStage("summarizing");
    const summary = await new Promise((resolve, reject) => {
      handleGenerateSummary(
        url,
        lang,
        extractedContent.extractedContent,
        resolve,
        (stage, message) => reject({ stage, message }),
        (errorLimiter) => {
          setErrorLimiter(errorLimiter);
          if (errorLimiter === "RATE_LIMIT_EXCEEDED") {
            setIsErrorSummary(true);
            reject({ stage: "summarizing", message: "RATE_LIMIT_EXCEEDED" });
          }
        }
      );
    });

    await handleStageCompletionDelay(setStageCompleted, 600);

    setPreloadSummaryStage("saving");
    await new Promise((resolve, reject) => {
      handleAddSummaryToArticle(
        articleId,
        summary.summary,
        savedArticles,
        setSavedArticles,
        setSelectedArticle,
        resolve,
        (stage, message) => reject({ stage, message })
      );
    });

    setPreloadSummaryStage("success");
  } catch (error) {
    setPreloadSummaryStage("error");
    setIsErrorSummary(true);
    setErrorStage(error.stage);
  } finally {
    setProcessingSummaryLang(null);
  }
};

export const handleDeleteSummaryWithStateUpdate = async (
  articleId,
  summaryId,
  savedArticles,
  setSavedArticles,
  selectedArticle,
  setSelectedArticle
) => {
  try {
    await ApiService.deleteSummary(articleId, summaryId);

    // Updates the states in savedArticles and selectedArticle by removing the summary with an ID equal to summaryId
    // Atualiza os estados em savedArticles e selectedArticle removendo o resumo com ID igual a summaryId
    const updatedArticles = savedArticles.map((article) => {
      if (article._id === articleId) {
        const updatedSummaries = article.summaries.filter(
          (summary) => summary._id !== summaryId
        );
        return { ...article, summaries: updatedSummaries };
      }
      return article;
    });

    setSavedArticles(updatedArticles);
    if (selectedArticle && selectedArticle._id === articleId) {
      setSelectedArticle({
        ...selectedArticle,
        summaries: selectedArticle.summaries.filter(
          (summary) => summary._id !== summaryId
        ),
      });
    }
  } catch (error) {
    console.error("Error while deleting summary:", error);
  }
};
