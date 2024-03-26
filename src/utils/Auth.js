import { API_URL, getFetchOptions } from "./apiConfig";
import { checkResponse } from "./checkResponse";

class Auth {
  constructor() {
    this._baseUrl = API_URL;
  }

  async signUp(email, password, name) {
    try {
      const response = await fetch(
        `${this._baseUrl}/users/signup`,
        getFetchOptions("POST", { email, password, name })
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while registering:", error);
      throw error;
    }
  }

  async signIn(email, password) {
    try {
      const response = await fetch(
        `${this._baseUrl}/users/signin`,
        getFetchOptions("POST", { email, password })
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while logging in:", error);
      throw error;
    }
  }

  async signOut() {
    try {
      const response = await fetch(
        `${this._baseUrl}/users/signout`,
        getFetchOptions("POST")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while logging out:", error);
      throw error;
    }
  }

  async verifySession() {
    try {
      const response = await fetch(
        `${this._baseUrl}/users/verify-session`,
        getFetchOptions("GET")
      );
      return checkResponse(response);
    } catch (error) {
      console.error("Error while verifying the session:", error);
      throw error;
    }
  }
}

export default new Auth();
