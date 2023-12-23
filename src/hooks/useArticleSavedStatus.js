import { useState, useEffect } from "react";

function useArticleSavedStatus(savedArticles, url, title) {
  const [isArticleSaved, setIsArticleSaved] = useState(false);
  const [isBookmarkActive, setIsBookmarkActive] = useState(false);

  useEffect(() => {
    const articleSaved =
      Array.isArray(savedArticles) &&
      savedArticles.some(
        (article) => article.url === url && article.title === title
      );
    setIsArticleSaved(articleSaved);
    setIsBookmarkActive(articleSaved);
  }, [url, title, savedArticles]);

  return { isArticleSaved, isBookmarkActive, setIsBookmarkActive };
}

export default useArticleSavedStatus;
