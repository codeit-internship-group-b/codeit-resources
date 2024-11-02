export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window !== "undefined") {
    try {
      const storageData = localStorage.getItem(key);
      return storageData ? (JSON.parse(storageData) as T) : null;
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }

  return null;
};
