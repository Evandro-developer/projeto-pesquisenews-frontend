import { API_URL, getHeaders } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class ApiService {
  constructor() {
    this._baseUrl = API_URL;
  }

  async getUserInfo() {
    try {
      const response = await fetch(`${this._baseUrl}/users/me`, {
        method: "GET",
        headers: getHeaders(),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while fetching the logged-in user:", error);
      throw error;
    }
  }

  async getSavedArticles() {
    try {
      const response = await fetch(`${this._baseUrl}/articles`, {
        method: "GET",
        headers: getHeaders(),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while fetching saved articles:", error);
      throw error;
    }
  }

  async createArticle(article) {
    try {
      const response = await fetch(`${this._baseUrl}/articles`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(article),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while creating the article:", error);
      throw error;
    }
  }

  async deleteArticle(articleId) {
    try {
      const response = await fetch(`${this._baseUrl}/articles/${articleId}`, {
        method: "DELETE",
        headers: getHeaders(),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while deleting the article:", error);
      throw error;
    }
  }

  async signup(email, password, name) {
    try {
      const response = await fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password, name }),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while performing the registration:", error);
      throw error;
    }
  }

  async signin(email, password) {
    try {
      const response = await fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await checkResponse(response);

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.error("Token not found in the response.");
      }
      return data;
    } catch (error) {
      console.error("Error while logging in:", error);
      throw error;
    }
  }

  async extractContent(url, lang, expireIn = 7, unit = "days") {
    try {
      const requestBody = { url, lang, expireIn, unit };

      const response = await fetch(
        `${this._baseUrl}/extract/extract-content-url`,
        {
          method: "POST",
          headers: getHeaders(),
          body: JSON.stringify(requestBody),
        }
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
        {
          method: "PATCH",
          headers: getHeaders(),
          body: JSON.stringify({ summary }),
        }
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
        {
          method: "DELETE",
          headers: getHeaders(),
        }
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while deleting summary:", error);
      throw error;
    }
  }
}

export default new ApiService();
