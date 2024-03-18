import ThirdPartyApiNewsApi from "../utils/ThirdPartyApiNewsApi";
import ThirdPartyApiOpenAI from "../utils/ThirdPartyApiOpenAI";
import { localStorageManager } from "./localStorageHelpers";

export const handleAppNewsSearch = async (
  query,
  language,
  onSearchSuccess,
  onSearchError
) => {
  try {
    localStorageManager.removeNewsData();
    localStorageManager.removeNewsFilters();

    const { articles = [] } = await ThirdPartyApiNewsApi.fetchEverything({
      q: query,
      lang: language,
    });

    if (articles.length === 0) {
      onSearchError();
      return;
    }

    localStorageManager.saveNewsData(query, articles);
    onSearchSuccess(articles);
  } catch (error) {
    onSearchError(error.message || "Error while searching for news.");
  }
};

export const handleGenerateSummary = async (
  url,
  lang,
  content,
  onSummarySuccess,
  onSummaryError,
  onRateLimitExceededError
) => {
  try {
    const summary = await ThirdPartyApiOpenAI.generateSummary(
      url,
      lang,
      content
    );
    onSummarySuccess(summary);
  } catch (error) {
    if (error.message && error.message.includes("Too Many Requests")) {
      onRateLimitExceededError("RATE_LIMIT_EXCEEDED");
    } else {
      onSummaryError(
        "summarizing",
        error.message || "Error while generating summary."
      );
    }
  }
};
