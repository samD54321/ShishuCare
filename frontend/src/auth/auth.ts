import { ILocalStorageItem } from "@interfaces/index";

export class LocalStorageItem {
  static getItem = (): ILocalStorageItem => {
    return JSON.parse(localStorage.getItem('User') || '{}');
  };

  static setItem = (user: ILocalStorageItem) => {
    localStorage.setItem('User', JSON.stringify(user));
  };

  static clearItem = () => {
    localStorage.removeItem('user');
  };
}
