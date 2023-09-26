class Auth {
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

  async _handleResponse(res) {
    const responseBody = await res.json();

    if (!res.ok) {
      const errorMessages = {
        "/signup": {
          400: "Um dos campos foi preenchido incorretamente",
        },
        "/signin": {
          400: "Um ou mais campos não foram fornecidos",
          401: "O usuário com o e-mail especificado não foi encontrado",
        },
        "/users/me": {
          400: "Token não fornecido ou fornecido em formato errado",
          401: "O token fornecido é inválido",
        },
        default: {
          200: "Requisição bem-sucedida",
          201: "Recurso criado com sucesso",
          400: "Requisição malformada",
          401: "Não autorizado",
          403: "Acesso proibido",
          404: "Recurso não encontrado",
          409: "Conflito",
          500: "Erro interno do servidor",
        },
      };

      const endpoint = res.url.slice(-res.url.lastIndexOf("/"));
      const errorMessage =
        errorMessages[endpoint]?.[res.status] ||
        errorMessages["default"][res.status] ||
        responseBody.message ||
        res.statusText;

      throw new Error(`${res.status} - ${errorMessage}`);
    }
    return responseBody;
  }

  async register(email, password, name) {
    try {
      const response = await fetch(`${this.baseUrl}/signup`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password, name }),
      });
      return this._handleResponse(response);
    } catch (error) {
      console.error("Erro ao registrar:", error);
      throw error;
    }
  }

  async login(email, password) {
    try {
      const response = await fetch(`${this.baseUrl}/signin`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await this._handleResponse(response);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.warn("Token não foi recebido após a tentativa de login.");
      }
      return data;
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }
}

const auth = new Auth("https://api.pesquisenews.com.br");

export default auth;
