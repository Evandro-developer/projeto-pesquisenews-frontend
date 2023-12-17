const setItem = (key, value) => localStorage.setItem(key, value);
const removeItem = (key) => localStorage.removeItem(key);

export const localStorageManager = {
  getCurrentLang: () => localStorage.getItem("appLang") || "en",
  saveNews: (query, articles) =>
    setItem("newsData", JSON.stringify({ query, articles })),
  saveToken: (token) => setItem("token", token),
  saveUserEmail: (email) => setItem("userEmail", email),
  saveUserName: (name) => setItem("name", name),
  removeToken: () => removeItem("token"),
  removeUserEmail: () => removeItem("userEmail"),
};
