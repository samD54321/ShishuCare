import { ILocalStorageItem } from "@interfaces/index";

export class LocalStorageItem {
  static getItem = (): ILocalStorageItem => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  };

  static setItem = (user: ILocalStorageItem) => {
    localStorage.setItem('user', JSON.stringify(user));
  };

  static clearItem = () => {
    localStorage.removeItem('user');
  };
}
