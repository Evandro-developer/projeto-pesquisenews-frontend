import { API_URL, getHeaders } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class ThirdPartyApiNewsApi {
  constructor() {
    this._baseUrl = API_URL;
  }

  async fetchEverything({ q, lang }) {
    try {
      const response = await fetch(`${this._baseUrl}?q=${q}&lang=${lang}`, {
        headers: getHeaders(),
      });
      return checkResponse(response);
    } catch (error) {
      console.error("Error while searching for news:", error);
      throw error;
    }
  }
}

export default new ThirdPartyApiNewsApi();
