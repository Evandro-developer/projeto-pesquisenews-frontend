import { API_URL, getHeaders } from "./apiConfig";

class ThirdPartyApi {
  constructor() {
    this._baseUrl = API_URL;
  }

  async _checkResponse(res) {
    if (!res.ok) {
      let errorMessage = `Error: ${res.statusText}`;

      try {
        const errorData = await res.json();

        if (errorData && errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        }
      } catch (err) {
        console.error("Erro ao analisar a resposta de erro:", err);
      }
      throw new Error(errorMessage);
    }
    return res.json();
  }

  async fetchEverything({ q, lang }) {
    try {
      const response = await fetch(`${this._baseUrl}?q=${q}&lang=${lang}`, {
        headers: getHeaders(),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      throw error;
    }
  }
}

export default new ThirdPartyApi();
