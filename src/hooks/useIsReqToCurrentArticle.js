import useSelectedArticle from "./useSelectedArticle";

const useIsReqToCurrentArticle = (lastFailedReqUrl, lastFailedReqArticleId) => {
  const { selectedArticle } = useSelectedArticle();

  return (
    selectedArticle &&
    (selectedArticle.url === lastFailedReqUrl ||
      selectedArticle._id === lastFailedReqArticleId)
  );
};

export default useIsReqToCurrentArticle;
