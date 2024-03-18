import React, { useContext, useMemo, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { LangContext } from "../contexts/LanguageContext";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";

function ViewNewsHeader({ isLoggedIn }) {
  const { selectedArticle } = useContext(SelectedArticleContext);
  const { t } = useContext(LangContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  useEffect(() => {
    if (!isLoggedIn) {
      setCurrentUser(null);
    }
  }, [isLoggedIn, setCurrentUser]);

  const summaryCount = useMemo(() => {
    return selectedArticle && selectedArticle.summaries
      ? selectedArticle.summaries.length
      : 0;
  }, [selectedArticle]);

  const summaryMessage = useMemo(() => {
    if (!isLoggedIn) {
      return t("viewNewsHeader.exploreArticleLoggedOut");
    }

    switch (summaryCount) {
      case 0:
        return t("viewNewsHeader.exploreArticle");
      case 1:
        return t("viewNewsHeader.oneSummary");
      default:
        return t("viewNewsHeader.multipleSummaries").replace(
          "{count}",
          summaryCount
        );
    }
  }, [summaryCount, t, isLoggedIn]);

  const languageCountMessage = useMemo(() => {
    if (!selectedArticle || !selectedArticle.summaries) {
      return "";
    }

    const languageCounts = selectedArticle.summaries.reduce((acc, summary) => {
      acc[summary.lang] = (acc[summary.lang] || 0) + 1;
      return acc;
    }, {});

    const languages = Object.keys(languageCounts).sort();
    const totalLanguages = languages.length;

    if (totalLanguages === 1) {
      return t("viewNewsHeader.oneTranslation").replace(
        "{language}",
        languages[0].toUpperCase()
      );
    } else if (totalLanguages === 2) {
      return t("viewNewsHeader.twoTranslations")
        .replace("{firstLanguage}", languages[0].toUpperCase())
        .replace("{secondLanguage}", languages[1].toUpperCase());
    } else if (totalLanguages > 2) {
      const remainingCount = totalLanguages - 2;
      let othersLabel =
        remainingCount === 1
          ? t("viewNewsHeader.more")
          : t("viewNewsHeader.others").replace("{count}", remainingCount);
      return t("viewNewsHeader.multipleTranslations")
        .replace("{firstLanguage}", languages[0].toUpperCase())
        .replace("{secondLanguage}", languages[1].toUpperCase())
        .replace("{remainingCount}", othersLabel);
    } else {
      return "";
    }
  }, [selectedArticle, t]);

  return (
    <section className="view-news-header">
      <div className="view-news-header__container">
        <p className="view-news-header__reading-article">
          {t("viewNewsHeader.readingArticle")}
        </p>
        <h2 className="view-news-header__heading">
          {isLoggedIn && currentUser?.name ? `${currentUser.name}, ` : ""}
          {summaryMessage}
        </h2>
        {isLoggedIn && languageCountMessage && (
          <p className="view-news-header__translated-languages">
            {t("viewNewsHeader.translatedLanguages")}: {languageCountMessage}
          </p>
        )}
      </div>
    </section>
  );
}

export default ViewNewsHeader;
