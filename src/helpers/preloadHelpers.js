export const determinePreloadMessage = ({
  t,
  isMainRoute,
  isViewNewsRoute,
  source,
  preloadSummaryStage,
}) => {
  let message = "";

  if (isMainRoute) {
    message = t("preload.headingSearchNews");
  } else if (isViewNewsRoute) {
    switch (preloadSummaryStage) {
      case "extracting":
        message =
          t("preload.headingExtractNews") +
          (source ? ` ${source.toUpperCase()}` : "");
        break;
      case "summarizing":
        message = t("preload.headingSummaryNews");
        break;
      case "saving":
        message = t("preload.headingSavingNews");
        break;
    }
  }
  return message;
};

export const determineErrorDetails = ({
  t,
  isError,
  isErrorSummary,
  errorStage,
  errorLimiter,
  lastFailedReqLang,
  isReqToCurrentArticle,
}) => {
  let errorTitle = "";
  let errorMessage = "";

  if (isError) {
    errorTitle = t("preload.errorTitleSearchNews");
    errorMessage = t("preload.errorTextSearchNews");
  } else if (isErrorSummary && isReqToCurrentArticle) {
    switch (errorStage) {
      case "extracting":
        errorTitle = t("preload.errorTitleExtractingNews", {
          source: "",
        });
        errorMessage = t("preload.errorTextExtractingNews");
        break;

      case "summarizing":
        if (errorLimiter === "RATE_LIMIT_EXCEEDED") {
          errorTitle = t("preload.errorTitleRateLimitExceeded");
          errorMessage = t("preload.errorTextRateLimitExceeded");
        } else {
          errorTitle = t("preload.errorTitleSummarizingNews", {
            lang: lastFailedReqLang.toUpperCase(),
          });
          errorMessage = t("preload.errorTextSummarizingNews");
        }
        break;

      case "saving":
        errorTitle = t("preload.errorTitleSavingNews");
        errorMessage = t("preload.errorTextSavingNews");
        break;
    }
  }

  return { errorTitle, errorMessage };
};
