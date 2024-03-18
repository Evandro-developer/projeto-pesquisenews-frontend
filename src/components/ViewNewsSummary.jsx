import React, { useContext } from "react";
import { LangContext } from "../contexts/LanguageContext";
import { getStateLangForKey } from "../helpers/localesHelpers";

function ViewNewsSummary({ summary }) {
  const { t, lang: globalLang } = useContext(LangContext);

  // Retrieves localized translation for the keys, independent of the global language context.
  // Obtém tradução localizada para as chaves, independente do contexto global de idioma.
  const getTranslation = (key) => {
    return getStateLangForKey(key, summary.lang, globalLang, t);
  };

  const formatKey = (key) => {
    return `${getTranslation(key)}: `;
  };

  const renderAuthor = (author) => {
    return author ? (
      <h4 className="view-news-summary__heading">{author}</h4>
    ) : null;
  };

  const renderSummaryItem = (key, value) => {
    return value ? (
      <li className="view-news-summary__param-text">
        <span className="view-news-summary__key-text">{formatKey(key)}</span>
        <span className="view-news-summary__value-text">{value}</span>
      </li>
    ) : null;
  };

  return (
    <section className="view-news-summary">
      {renderAuthor(summary.author)}
      <ul className="view-news-summary__container">
        {renderSummaryItem("viewNewsSummary.title", summary.title)}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.who",
          summary.fiveWsAnd1H.who
        )}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.what",
          summary.fiveWsAnd1H.what
        )}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.when",
          summary.fiveWsAnd1H.when
        )}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.where",
          summary.fiveWsAnd1H.where
        )}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.why",
          summary.fiveWsAnd1H.why
        )}
        {renderSummaryItem(
          "viewNewsSummary.fiveWsAnd1H.how",
          summary.fiveWsAnd1H.how
        )}
        {renderSummaryItem(
          "viewNewsSummary.importantStatements",
          summary.importantStatements
        )}
        {renderSummaryItem(
          "viewNewsSummary.opinionsAndAnalyses",
          summary.opinionsAndAnalyses
        )}
        {renderSummaryItem("viewNewsSummary.conclusions", summary.conclusions)}
        {renderSummaryItem(
          "viewNewsSummary.sourceIdentification",
          summary.sourceIdentification
        )}
        {renderSummaryItem(
          "viewNewsSummary.linksToIssues",
          summary.linksToIssues
        )}
        {renderSummaryItem("viewNewsSummary.visuals", summary.visuals)}
        {renderSummaryItem(
          "viewNewsSummary.relatedTopics",
          summary.relatedTopics
        )}
      </ul>
    </section>
  );
}

export default ViewNewsSummary;
