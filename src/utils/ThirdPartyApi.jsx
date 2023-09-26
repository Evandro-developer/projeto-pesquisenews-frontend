class ThirdPartyApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  _getHeaders() {
    const headers = {
      "Content-Type": "application/json",
    };

    const token = localStorage.getItem("token");

    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return headers;
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

  async fetchEverything({ q }) {
    try {
      const response = await fetch(`${this.baseUrl}?q=${q}`, {
        headers: this._getHeaders(),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao buscar notícias:", error);
      throw error;
    }
  }
}

export default new ThirdPartyApi("https://api.pesquisenews.com.br");
