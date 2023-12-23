import ApiService from "../utils/ApiService";

function useDeleteArticleFromAPI(savedArticles, setSavedArticles, currentUser) {
  const deleteArticle = async (articleId) => {
    if (!currentUser) return;

    try {
      await ApiService.deleteArticle(articleId);
      setSavedArticles(
        savedArticles.filter((article) => article._id !== articleId)
      );
    } catch (error) {
      console.error("Erro ao excluir o artigo:", error);
    }
  };

  return deleteArticle;
}

export default useDeleteArticleFromAPI;
