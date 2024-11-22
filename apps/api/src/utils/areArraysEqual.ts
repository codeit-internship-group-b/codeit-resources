export const areArraysEqual = (arr1: string[], arr2: string[]): boolean => {
  if (arr1.length !== arr2.length) return false;

  const arr1Set = new Set(arr1);
  const arr2Set = new Set(arr2);

  if (arr1Set.size !== arr2Set.size) return false;

  for (const item of arr1Set) {
    if (!arr2Set.has(item)) return false;
  }

  return true;
};
