import { useContext } from "react";
import { SelectedArticleContext } from "../contexts/SelectedArticleContext";

const useSelectedArticle = () => {
  const context = useContext(SelectedArticleContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedArticle must be used within a SelectedArticleProvider"
    );
  }
  return context;
};

export default useSelectedArticle;
