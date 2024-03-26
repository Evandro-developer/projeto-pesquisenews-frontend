import { API_URL, getFetchOptions } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class ThirdPartyApiNewsApi {
  constructor() {
    this._baseUrl = API_URL;
  }

  async fetchEverything({ q, lang }) {
    try {
      const encodedQuery = encodeURIComponent(q);
      const encodedLang = encodeURIComponent(lang);
      const url = `${this._baseUrl}?q=${encodedQuery}&lang=${encodedLang}`;
      const response = await fetch(url, getFetchOptions("GET"));
      return checkResponse(response);
    } catch (error) {
      console.error("Error while searching for news:", error);
      throw error;
    }
  }
}

export default new ThirdPartyApiNewsApi();
