import { useState, useEffect, useContext } from "react";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";
import { languages } from "../helpers/localesHelpers";

export const useSummariesArticle = () => {
  const { selectedArticle } = useContext(SelectedArticleContext);
  const [newAvailableLangs, setNewAvailableLangs] = useState([]);
  const [someSummariesCompleted, setSomeSummariesCompleted] = useState(false);
  const [allSummariesCompleted, setAllSummariesCompleted] = useState(false);

  const availableLangs = (summaries, allLanguages) => {
    if (!summaries || summaries.length === 0) return allLanguages;
    const summaryLangs = summaries.map((summary) => summary.lang);
    return allLanguages.filter((lang) => !summaryLangs.includes(lang));
  };

  const hasSomeSummaries = (article) =>
    article.summaries && article.summaries.length > 0;

  const hasAllSummaries = (article) =>
    languages.every(
      (lang) =>
        article.summaries &&
        article.summaries.some((summary) => summary.lang === lang)
    );

  useEffect(() => {
    if (selectedArticle) {
      const updatedAvailableLangs = availableLangs(
        selectedArticle.summaries,
        languages
      );
      setNewAvailableLangs(updatedAvailableLangs);
      setSomeSummariesCompleted(hasSomeSummaries(selectedArticle));
      setAllSummariesCompleted(hasAllSummaries(selectedArticle));
    }
  }, [selectedArticle, languages]);

  return { newAvailableLangs, someSummariesCompleted, allSummariesCompleted };
};
