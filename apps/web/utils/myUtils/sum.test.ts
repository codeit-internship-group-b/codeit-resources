import { sum, isPositive } from "./sum";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("checks if a number is positive", () => {
  expect(isPositive(5)).toBe(true);
  expect(isPositive(-3)).toBe(false);
});
