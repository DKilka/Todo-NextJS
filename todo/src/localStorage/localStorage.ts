import { LocalStorage } from "./services/services";

export const saveToLocalStorage = (item: any, key: string) => {
  return LocalStorage().setItem(key, item);
};

export const getFromLocalStorage = (key: string) => {
  return LocalStorage().getItem(key);
};
