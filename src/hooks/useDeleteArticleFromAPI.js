import ApiService from "../utils/ApiService";

function useDeleteArticleFromAPI(
  savedArticles,
  setSavedArticles,
  filteredSavedArticles,
  setFilteredSavedArticles,
  currentUser
) {
  const deleteArticle = async (articleId) => {
    if (!currentUser) return;

    try {
      await ApiService.deleteArticle(articleId);
      const updatedSavedArticles = savedArticles.filter(
        (article) => article._id !== articleId
      );
      setSavedArticles(updatedSavedArticles);

      const updatedFilteredSavedArticles = filteredSavedArticles.filter(
        (article) => article._id !== articleId
      );
      setFilteredSavedArticles(updatedFilteredSavedArticles);
    } catch (error) {
      console.error("Erro ao excluir o artigo:", error);
    }
  };

  return deleteArticle;
}

export default useDeleteArticleFromAPI;
