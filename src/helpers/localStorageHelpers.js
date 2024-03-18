const setItem = (key, value) => localStorage.setItem(key, value);
const getItem = (key) => localStorage.getItem(key);
const removeItem = (key) => localStorage.removeItem(key);

export const localStorageManager = {
  saveCurrentLang: (lang) => setItem("appLang", lang),
  saveToken: (token) => setItem("token", token),
  saveUserName: (name) => setItem("name", name),
  saveUserEmail: (email) => setItem("userEmail", email),
  saveNewsData: (query, articles) =>
    setItem("newsData", JSON.stringify({ query, articles })),
  saveNewsFilters: (filters) => setItem("newsFilters", JSON.stringify(filters)),
  saveSavedArticleFilters: (filters) =>
    setItem("savedArticleFilters", JSON.stringify(filters)),

  getCurrentLang: () => getItem("appLang") || "en",
  getToken: () => getItem("token"),
  getUserName: () => {
    return getItem("name");
  },
  getNewsData: () => {
    const parseData = getItem("newsData");
    return parseData ? JSON.parse(parseData) : null;
  },
  getNewsFilters: () => {
    const filters = getItem("newsFilters");
    return filters ? JSON.parse(filters) : null;
  },
  getSavedArticleFilters: () => {
    const filters = getItem("savedArticleFilters");
    return filters ? JSON.parse(filters) : null;
  },

  removeToken: () => removeItem("token"),
  removeUserEmail: () => removeItem("userEmail"),
  removeNewsData: () => removeItem("newsData"),
  removeCurrentUser: () => {
    removeItem("token");
    removeItem("userEmail");
    removeItem("name");
  },
  removeNewsFilters: () => removeItem("newsFilters"),
  removeSavedArticleFilters: () => removeItem("savedArticleFilters"),
};
