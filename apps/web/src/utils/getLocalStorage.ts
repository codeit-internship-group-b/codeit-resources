export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    const storageData = localStorage.getItem(key);
    return storageData ? (JSON.parse(storageData) as T) : null;
  }

  return null;
};
