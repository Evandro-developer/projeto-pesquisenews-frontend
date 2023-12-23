import ApiService from "../utils/ApiService";

function useSaveArticleToAPI(savedArticles, setSavedArticles, currentUser) {
  const saveArticle = async (article) => {
    if (!currentUser) return;

    try {
      const response = await ApiService.createArticle(article);
      setSavedArticles([...savedArticles, ...response.articles]);
    } catch (error) {
      console.error("Erro ao salvar o artigo:", error);
    }
  };

  return saveArticle;
}

export default useSaveArticleToAPI;
