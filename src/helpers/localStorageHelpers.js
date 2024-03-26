const setItem = (key, value) => localStorage.setItem(key, value);
const getItem = (key) => localStorage.getItem(key);
const removeItem = (key) => localStorage.removeItem(key);

export const localStorageManager = {
  saveCurrentLang: (lang) => setItem("appLang", lang),
  saveUserName: (name) => setItem("name", name),
  saveUserEmail: (email) => setItem("userEmail", email),
  saveNewsData: (query, articles) =>
    setItem("newsData", JSON.stringify({ query, articles })),
  saveNewsFilters: (filters) => setItem("newsFilters", JSON.stringify(filters)),
  saveSavedArticleFilters: (filters) =>
    setItem("savedArticleFilters", JSON.stringify(filters)),

  getCurrentLang: () => getItem("appLang") || "en",
  getUserName: () => {
    return getItem("name");
  },
  getNewsData: () => {
    const parseData = getItem("newsData");
    return parseData ? JSON.parse(parseData) : null;
  },
  getNewsFilters: () => {
    const parseData = getItem("newsparseData");
    return parseData ? JSON.parse(parseData) : null;
  },
  getSavedArticleFilters: () => {
    const parseData = getItem("savedArticleparseData");
    return parseData ? JSON.parse(parseData) : null;
  },

  removeToken: () => removeItem("token"),
  removeUserEmail: () => removeItem("userEmail"),
  removeCurrentUser: () => {
    removeItem("userEmail");
    removeItem("name");
  },
  removeNewsData: () => removeItem("newsData"),
  removeNewsFilters: () => removeItem("newsFilters"),
  removeSavedArticleFilters: () => removeItem("savedArticleFilters"),
};
