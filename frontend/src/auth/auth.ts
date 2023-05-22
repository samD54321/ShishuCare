export class LocalStorageToken {

  static getToken = (name:string) : string | null => {
    return localStorage.getItem(name);
  };

  static setToken = (token: string,name:string) => {
    localStorage.setItem(name, token);
  };

  static clearToken = (name:string) => {
    localStorage.removeItem(name);
  }
}

