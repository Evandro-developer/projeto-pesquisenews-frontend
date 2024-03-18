import React, { createContext, useState } from "react";

export const SelectedArticleContext = createContext({
  selectedArticle: null,
  setSelectedArticle: () => {},
});

export const SelectedArticleProvider = ({ children }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <SelectedArticleContext.Provider
      value={{ selectedArticle, setSelectedArticle }}
    >
      {children}
    </SelectedArticleContext.Provider>
  );
};
