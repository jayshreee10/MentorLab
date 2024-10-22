export class LocalStorageService {
  // Set token, email, and role to local storage
  static setToken(token, email, role, username) {
    localStorage.setItem("token_key", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    localStorage.setItem("username", username);
  }

  // Get token from local storage
  static getToken() {
    return localStorage.getItem("token_key");
  }

  // Remove token, email, and role from local storage
  static removeToken() {
    localStorage.removeItem("token_key");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  }
}
