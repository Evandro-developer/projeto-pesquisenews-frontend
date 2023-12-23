import { useState, useEffect } from "react";

function useFindArticleById(savedArticles, url) {
  const [articleId, setArticleId] = useState(null);

  useEffect(() => {
    if (Array.isArray(savedArticles)) {
      const foundArticle = savedArticles.find((article) => article.url === url);
      if (foundArticle && foundArticle._id) {
        setArticleId(foundArticle._id);
      }
    }
  }, [savedArticles, url]);

  return articleId;
}

export default useFindArticleById;
