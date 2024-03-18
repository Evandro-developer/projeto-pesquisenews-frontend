import { useContext } from "react";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";

const useIsReqToCurrentArticle = (lastFailedReqUrl, lastFailedReqArticleId) => {
  const { selectedArticle } = useContext(SelectedArticleContext);

  return (
    selectedArticle &&
    (selectedArticle.url === lastFailedReqUrl ||
      selectedArticle._id === lastFailedReqArticleId)
  );
};

export default useIsReqToCurrentArticle;
