const getItem = (key, defaultValue = null) =>
  localStorage.getItem(key) || defaultValue;
const setItem = (key, value) => localStorage.setItem(key, value);
const removeItem = (key) => localStorage.removeItem(key);

export const localStorageManager = {
  getCurrentLang: () => getItem("appLang") || "en",
  getToken: () => getItem("token"),
  getUserName: () => {
    return getItem("name");
  },
  getNewsData: () => {
    const parseData = getItem("newsData");
    return parseData ? JSON.parse(parseData) : null;
  },

  saveCurrentLang: (lang) => setItem("appLang", lang),
  saveToken: (token) => setItem("token", token),
  saveUserName: (name) => setItem("name", name),
  saveUserEmail: (email) => setItem("userEmail", email),
  saveNewsData: (query, articles) =>
    setItem("newsData", JSON.stringify({ query, articles })),

  removeToken: () => removeItem("token"),
  removeUserEmail: () => removeItem("userEmail"),
  removeNewsData: () => removeItem("newsData"),
  removeCurrentUser: () => {
    removeItem("token");
    removeItem("userEmail");
    removeItem("name");
  },
};
