import { useMemo } from "react";
import useLang from "../hooks/useLang";
import useCurrentUser from "../hooks/useCurrentUser";

function SavedNewsHeader({ savedArticles }) {
  const { t } = useLang();
  const { currentUser } = useCurrentUser();

  const displayKeywords = useMemo(() => {
    function formatKeywords(keywords) {
      const keywordCounts = keywords.reduce((acc, keyword) => {
        acc[keyword] = (acc[keyword] || 0) + 1;
        return acc;
      }, {});

      const sortedKeywords = Object.entries(keywordCounts)
        .sort((a, b) => b[1] - a[1])
        .map((entry) => entry[0]);

      if (sortedKeywords.length <= 3) {
        return sortedKeywords.join(", ");
      }

      return t("savedNewsHeader.keywordsSummary", {
        firstKeyword: sortedKeywords[0],
        secondKeyword: sortedKeywords[1],
        remainingCount: sortedKeywords.length - 2,
      });
    }

    const keywords = savedArticles
      .filter((article) => article.keyword)
      .map((article) => article.keyword);

    return formatKeywords(keywords);
  }, [savedArticles, t]);

  const articlesCountMessage = useMemo(() => {
    const articlesCount = savedArticles.length;
    if (articlesCount === 0) {
      return t("savedNewsHeader.noSavedArticle");
    } else if (articlesCount === 1) {
      return t("savedNewsHeader.oneSavedArticle");
    } else {
      return t("savedNewsHeader.multipleSavedArticles", {
        count: articlesCount,
      });
    }
  }, [savedArticles.length, t]);

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__saved-articles">
          {t("savedNewsHeader.savedArticles")}
        </p>
        <h2 className="saved-news-header__heading">
          {currentUser?.name}, {articlesCountMessage}
        </h2>
        {savedArticles.length > 0 && (
          <p className="saved-news-header__keyword">
            {t("savedNewsHeader.byKeywords")}: {displayKeywords}
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
