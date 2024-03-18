import { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import useRouteChecker from "./useRouteChecker";
import {
  determinePreloadMessage,
  determineErrorDetails,
} from "../helpers/preloadHelpers";
import errorImage from "../images/img_error_search_article.svg";

const usePreloadContentAndJsx = ({
  source,
  preloadSummaryStage,
  isError,
  isErrorSummary,
  errorStage,
  errorLimiter,
  lastFailedReqLang,
  isReqToCurrentArticle,
}) => {
  const { t } = useContext(LangContext);
  const { isMainRoute, isViewNewsRoute } = useRouteChecker();

  const message = determinePreloadMessage({
    t,
    isMainRoute,
    isViewNewsRoute,
    source,
    preloadSummaryStage,
  });

  let { errorTitle, errorMessage } = determineErrorDetails({
    t,
    isError,
    isErrorSummary,
    errorStage,
    errorLimiter,
    source,
    lastFailedReqLang,
    isReqToCurrentArticle,
  });

  let errorContent = null;
  if (isError) {
    const imgSrc = errorImage;
    const altText = t("preload.pictureError");
    const imgClass = "preload__error-img";

    errorTitle = t("preload.errorTitleSeachNews");
    errorMessage = t("preload.errorTextSeachNews");
    errorContent = (
      <>
        <picture>
          <img src={imgSrc} alt={altText} className={imgClass} />
        </picture>
        <h2 className="preload__heading-error">{errorTitle}</h2>
        <p className="preload__text-error">{errorMessage}</p>
      </>
    );
  }

  const sourceStyledInExtractingError =
    isErrorSummary && errorStage === "extracting" && source ? (
      <span className="preload__source">{source.toUpperCase()}</span>
    ) : null;

  if (isErrorSummary) {
    errorContent = (
      <>
        <h2 className="preload__heading-error">
          {errorTitle} {sourceStyledInExtractingError}
        </h2>
        <p className="preload__text-error">{errorMessage}</p>
      </>
    );
  }

  return { message, errorContent };
};

export default usePreloadContentAndJsx;
