import ApiService from "../utils/ApiService";

function useSaveArticleToAPI(setSavedArticles, currentUser) {
  const saveArticle = async (article) => {
    if (!currentUser) return;
    try {
      const response = await ApiService.createArticle(article);
      setSavedArticles((prevArticles) => [
        ...prevArticles,
        ...response.articles,
      ]);
    } catch (error) {
      console.error("Erro ao salvar o artigo:", error);
    }
  };
  return saveArticle;
}

export default useSaveArticleToAPI;
