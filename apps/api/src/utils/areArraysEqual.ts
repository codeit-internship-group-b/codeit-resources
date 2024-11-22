export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item) => arr2.includes(item)) && arr2.every((item) => arr1.includes(item));
};
