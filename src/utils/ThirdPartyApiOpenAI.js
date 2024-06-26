import { API_URL, getFetchOptions } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class ThirdPartyApiOpenAI {
  constructor() {
    this._baseUrl = API_URL;
  }

  async generateSummary(url, lang, content, expireIn = 1, unit = "days") {
    try {
      const requestBody = {
        url,
        lang,
        extractedContent: content,
        expireIn,
        unit,
      };

      const response = await fetch(
        `${this._baseUrl}/summary-ai/generate-summary-ai`,
        getFetchOptions("POST", requestBody)
      );

      return checkResponse(response);
    } catch (error) {
      console.error("Error while generating summary:", error);
      throw error;
    }
  }
}

export default new ThirdPartyApiOpenAI();
