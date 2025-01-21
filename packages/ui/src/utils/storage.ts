import { stringifyJson } from "./stringifyJson";

const getStoredData = <T>(key: string, defaultValue: T): T => {
  return JSON.parse(localStorage.getItem(key) ?? stringifyJson(defaultValue)) as T;
};

const setStoredData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, stringifyJson(data));
};

export const storage = {
  get: getStoredData,
  set: setStoredData,
};
