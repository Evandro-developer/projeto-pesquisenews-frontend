class ApiService {
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

  async getUserInfo() {
    try {
      const response = await fetch(`${this.baseUrl}/users/me`, {
        method: "GET",
        headers: this._getHeaders(),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao buscar o usuário logado:", error);
      throw error;
    }
  }

  async getSavedArticles() {
    try {
      const response = await fetch(`${this.baseUrl}/articles`, {
        method: "GET",
        headers: this._getHeaders(),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao buscar artigos salvos:", error);
      throw error;
    }
  }

  async createArticle(article) {
    try {
      const response = await fetch(`${this.baseUrl}/articles`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify(article),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao criar o artigo:", error);
      throw error;
    }
  }

  async deleteArticle(articleId) {
    try {
      const response = await fetch(`${this.baseUrl}/articles/${articleId}`, {
        method: "DELETE",
        headers: this._getHeaders(),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao deletar o artigo:", error);
      throw error;
    }
  }

  async signup(email, password, name) {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password, name }),
      });
      return this._checkResponse(response);
    } catch (error) {
      console.error("Erro ao realizar o cadastro:", error);
      throw error;
    }
  }

  async signin(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password }),
      });

      const data = await this._checkResponse(response);

      if (data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.error("Token não encontrado na resposta.");
      }
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
}

export default new ApiService("https://api.pesquisenews.com.br");
