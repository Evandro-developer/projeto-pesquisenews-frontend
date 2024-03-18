import { useState, useEffect } from "react";
import useRouteChecker from "./useRouteChecker";

const useSummaryAnimation = (
  stageCompleted,
  preloadSummaryStage,
  errorLimiter,
  summaryParamsListLength
) => {
  const { isViewNewsRoute } = useRouteChecker();
  const [currentParamIndex, setCurrentParamIndex] = useState(0);

  useEffect(() => {
    if (
      isViewNewsRoute &&
      !stageCompleted &&
      !errorLimiter &&
      preloadSummaryStage === "summarizing"
    ) {
      if (summaryParamsListLength <= 1) {
        return;
      }
      const interval = setInterval(() => {
        setCurrentParamIndex((current) => {
          const nextIndex = current + 1;
          if (nextIndex >= summaryParamsListLength) {
            clearInterval(interval);
            return current;
          }

          return nextIndex;
        });
      }, 1200);

      return () => clearInterval(interval);
    }
  }, [
    isViewNewsRoute,
    stageCompleted,
    errorLimiter,
    preloadSummaryStage,
    summaryParamsListLength,
  ]);

  return currentParamIndex;
};

export default useSummaryAnimation;
