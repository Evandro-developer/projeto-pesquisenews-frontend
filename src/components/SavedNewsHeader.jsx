import { useContext, useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function SavedNewsHeader({ savedArticles }) {
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

      return `${sortedKeywords[0]}, ${sortedKeywords[1]} e ${
        sortedKeywords.length - 2
      } outras`;
    }

    const keywords = savedArticles
      .filter((article) => article.keyword)
      .map((article) => article.keyword);

    setDisplayKeywords(formatKeywords(keywords));
  }, [savedArticles]);

  return (
    <section className="saved-news-header">
      <div className="saved-news-header__container">
        <p className="saved-news-header__saved-articles">Artigos salvos</p>
        <h2 className="saved-news-header__heading">
          {currentUser?.name}, você tem{" "}
          {savedArticles.length === 0
            ? "nenhum artigo salvo"
            : savedArticles.length === 1
            ? "1 artigo salvo"
            : `${savedArticles.length} artigos salvos`}
        </h2>
        {savedArticles.length > 0 && (
          <p className="saved-news-header__keyword">
            Por palavras-chave: {displayKeywords}
          </p>
        )}
      </div>
    </section>
  );
}

export default SavedNewsHeader;
