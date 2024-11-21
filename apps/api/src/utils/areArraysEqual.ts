interface AreArraysEqualProps {
  arr1: string[];
  arr2: string[];
}

export const areArraysEqual = ({ arr1 = [], arr2 = [] }: AreArraysEqualProps): boolean => {
  if (arr1.length !== arr2.length) return false;

  const sorted1 = [...arr1].sort();
  const sorted2 = [...arr2].sort();

  return sorted1.every((item, index) => item === sorted2[index]);
};
