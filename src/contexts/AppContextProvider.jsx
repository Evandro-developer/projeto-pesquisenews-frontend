// src/contexts/AppContextProvider.jsx
import React from "react";
import CurrentUserContext from "./CurrentUserContext";
import { FilterProvider } from "./FilterContext";
import { SelectedArticleProvider } from "./SelectedArticleContext";
import { SummaryProcessProvider } from "./SummaryProcessContext";

const AppContextProvider = ({ children, contextProps }) => {
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser: contextProps.currentUser,
        setCurrentUser: contextProps.setCurrentUser,
      }}
    >
      <FilterProvider
        articles={{
          newsData: contextProps.newsData,
          savedArticles: contextProps.savedArticles,
        }}
      >
        <SelectedArticleProvider>
          <SummaryProcessProvider
            savedArticles={contextProps.savedArticles}
            setSavedArticles={contextProps.setSavedArticles}
            selectedArticle={contextProps.selectedArticle}
            setSelectedArticle={contextProps.setSelectedArticle}
            setSummaryScrollY={contextProps.setSummaryScrollY}
            setErrorLimiter={contextProps.setErrorLimiter}
          >
            {children}
          </SummaryProcessProvider>
        </SelectedArticleProvider>
      </FilterProvider>
    </CurrentUserContext.Provider>
  );
};

export default AppContextProvider;
