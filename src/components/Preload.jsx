import { forwardRef } from "react";
import useLang from "../hooks/useLang";
import useSummaryProcess from "../hooks/useSummaryProcess";
import usePreloadContentAndJsx from "../hooks/usePreloadContentAndJsx";
import useSummaryParamsList from "../hooks/useSummaryParamsList";
import useSummaryAnimation from "../hooks/useSummaryAnimation";
import useIsReqToCurrentArticle from "../hooks/useIsReqToCurrentArticle";
import useRouteChecker from "../hooks/useRouteChecker";
import defaultSpinnerImage from "../images/img_spinner.svg";
import AIAnimationCircle from "./AIAnimationCircle";

const Preload = forwardRef(({ isError, source, errorLimiter }, ref) => {
  const { t } = useLang();
  const {
    stageCompleted,
    preloadSummaryStage,
    isErrorSummary,
    errorStage,
    lastFailedReqUrl,
    lastFailedReqLang,
    lastFailedReqArticleId,
  } = useSummaryProcess();
  const isReqToCurrentArticle = useIsReqToCurrentArticle(
    lastFailedReqUrl,
    lastFailedReqArticleId
  );
  const summaryParamsList = useSummaryParamsList();
  const currentParamIndex = useSummaryAnimation(
    stageCompleted,
    preloadSummaryStage,
    errorLimiter,
    summaryParamsList.length
  );
  const { message, errorContent } = usePreloadContentAndJsx({
    source,
    preloadSummaryStage,
    isError,
    isErrorSummary,
    errorStage,
    errorLimiter,
    lastFailedReqLang,
    isReqToCurrentArticle: isReqToCurrentArticle,
  });
  const { isViewNewsRoute } = useRouteChecker();

  const contentSummaryParamsList = summaryParamsList[currentParamIndex] || "";
  const imgSrc = defaultSpinnerImage;
  const altText = t("preload.pictureSpinner");
  const imgClass = "preload__spinner-img";
  const contentClass = "preload__content-spinner";

  const isSummarizing =
    isViewNewsRoute && preloadSummaryStage === "summarizing";

  let animationToShow = isSummarizing ? (
    <AIAnimationCircle animate={true} completed={stageCompleted} />
  ) : (
    <picture>
      <img className={imgClass} src={imgSrc} alt={altText} />
    </picture>
  );

  let hasExceededRateLimit =
    isErrorSummary && errorLimiter === "RATE_LIMIT_EXCEEDED";

  let contentToShow =
    isError || isErrorSummary || hasExceededRateLimit ? (
      errorContent
    ) : (
      <>
        {animationToShow}
        <h3 className="preload__heading-animation">{message}</h3>
        {isSummarizing && (
          <p className="preload__text-analyticalSummaryParams">
            {contentSummaryParamsList}
          </p>
        )}
      </>
    );

  const preloadClassName = `preload ${
    isViewNewsRoute ? "preload_theme_transparent" : ""
  }`;

  return (
    <section className={preloadClassName} ref={ref}>
      <div className={contentClass}>{contentToShow}</div>
    </section>
  );
});

Preload.displayName = "Preload";

export default Preload;
