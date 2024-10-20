export class LocalStorageService {
  //set token to local storage
  static setToken(token) {
    localStorage.setItem("token_key", token);
  }
  //get token from local storage
  static getToken() {
    return localStorage.getItem("token_key");
  }
  //remove token from local storage
  static removeToken() {
    localStorage.removeItem("token_key");
  }
}
