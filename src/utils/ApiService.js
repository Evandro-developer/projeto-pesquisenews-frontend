import { API_URL, getFetchOptions } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class ApiService {
  constructor() {
    this._baseUrl = API_URL;
  }

  async getUserInfo() {
    try {
      const response = await fetch(
        `${this._baseUrl}/users/me`,
        getFetchOptions("GET")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while fetching the logged-in user:", error);
      throw error;
    }
  }

  async getSavedArticles() {
    try {
      const response = await fetch(
        `${this._baseUrl}/articles`,
        getFetchOptions("GET")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while fetching saved articles:", error);
      throw error;
    }
  }

  async createArticle(article) {
    try {
      const response = await fetch(
        `${this._baseUrl}/articles`,
        getFetchOptions("POST", article)
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while creating the article:", error);
      throw error;
    }
  }

  async deleteArticle(articleId) {
    try {
      const response = await fetch(
        `${this._baseUrl}/articles/${articleId}`,
        getFetchOptions("DELETE")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while deleting the article:", error);
      throw error;
    }
  }

  async extractContent(url, lang, expireIn = 7, unit = "days") {
    try {
      const requestBody = { url, lang, expireIn, unit };
      const response = await fetch(
        `${this._baseUrl}/extract/extract-content-url`,
        getFetchOptions("POST", requestBody)
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while extracting content:", error);
      throw error;
    }
  }

  async addSummaryToArticle(articleId, summary) {
    try {
      const response = await fetch(
        `${this._baseUrl}/summary/articles/${articleId}`,
        getFetchOptions("PATCH", { summary })
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while adding summary to the article:", error);
      throw error;
    }
  }

  async deleteSummary(articleId, summaryId) {
    try {
      const response = await fetch(
        `${this._baseUrl}/summary/articles/${articleId}/${summaryId}`,
        getFetchOptions("DELETE")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while deleting summary:", error);
      throw error;
    }
  }
}

export default new ApiService();
