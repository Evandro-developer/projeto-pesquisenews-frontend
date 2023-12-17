import { useContext, useState, useEffect } from "react";
import { LangContext } from "../contexts/LanguageContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SavedNewsHeader({ savedArticles }) {
  const { t } = useContext(LangContext);
  const { currentUser } = useContext(CurrentUserContext);
  const [displayKeywords, setDisplayKeywords] = useState("");

  useEffect(() => {
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

      return `${sortedKeywords[0]}, ${sortedKeywords[1]} ${t(
        "savedNewsHeader.and"
      )} ${sortedKeywords.length - 2} ${t("savedNewsHeader.others")}`;
    }

    const keywords = savedArticles
      .filter((article) => article.keyword)
      .map((article) => article.keyword);

    setDisplayKeywords(formatKeywords(keywords));
  }, [savedArticles, t]);

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__saved-articles">
          {t("savedNewsHeader.savedArticles")}
        </p>
        <h2 className="saved-news-header__heading">
          {currentUser?.name}, {t("savedNewsHeader.youHave")}{" "}
          {savedArticles.length === 0
            ? t("savedNewsHeader.noSavedArticle")
            : savedArticles.length === 1
            ? t("savedNewsHeader.oneSavedArticle")
            : `${savedArticles.length} ${t(
                "savedNewsHeader.multipleSavedArticles"
              )}`}
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
