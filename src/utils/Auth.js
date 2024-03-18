import { API_URL, getHeaders } from "./apiConfig";

class Auth {
  constructor() {
    this._baseUrl = API_URL;
  }

  async _handleResponse(res) {
    const responseBody = await res.json();

    if (!res.ok) {
      const errorMessages = {
        "/signup": {
          400: "One of the fields was filled out incorrectly",
        },
        "/signin": {
          400: "One or more fields were not provided",
          401: "The user with the specified email was not found",
        },
        "/users/me": {
          400: "Token not provided or provided in the wrong format",
          401: "The provided token is invalid",
        },
        default: {
          200: "Request successful",
          201: "Resource successfully created",
          400: "Malformed request",
          401: "Unauthorized",
          403: "Access forbidden",
          404: "Resource not found",
          409: "Conflict",
          500: "Internal server error",
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
      const response = await fetch(`${this._baseUrl}/signup`, {
        method: "POST",
        headers: getHeaders(),
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
      const response = await fetch(`${this._baseUrl}/signin`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify({ email, password }),
      });
      const data = await this._handleResponse(response);
      if (data && data.token) {
        localStorage.setItem("token", data.token);
      } else {
        console.warn("Token was not received after login attempt.");
      }
      return data;
    } catch (error) {
      console.error("Error while logging in:", error);
      throw error;
    }
  }
}

export default new Auth();
