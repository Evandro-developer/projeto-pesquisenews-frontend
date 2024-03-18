export const extractAndSortLanguages = (articles) => {
  const languages = articles
    .map((article) => article.lang)
    .filter((value, index, self) => self.indexOf(value) === index);
  return languages.sort();
};

export const extractAndSortSources = (articles) => {
  const sources = articles
    .map((article) => article.source)
    .filter((value, index, self) => self.indexOf(value) === index);
  return sources.sort();
};

export const sortedArticleKeywords = (articleKeywords) => {
  return Array.isArray(articleKeywords) ? articleKeywords.sort() : [];
};

export const extractSummaryLanguages = (articles) => {
  let languages = [];
  articles.forEach((article) => {
    article.summaries.forEach((summary) => {
      if (!languages.includes(summary.lang)) {
        languages.push(summary.lang);
      }
    });
  });
  return languages.sort();
};
