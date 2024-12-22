const getStoredData = <T>(key: string, defaultValue: T): T => {
  return JSON.parse(localStorage.getItem(key) ?? JSON.stringify(defaultValue)) as T;
};

const setStoredData = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const storage = {
  get: getStoredData,
  set: setStoredData,
};
