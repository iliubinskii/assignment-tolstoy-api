import { describe, expect, it } from "@jest/globals";
import { getRandomArray } from "./get-random-array.js";

describe("getRandomArray", () => {
  it("should return an array of the specified length", () => {
    const length = 10 + Math.floor(Math.random() * 10);

    const result = getRandomArray(length);

    expect(result).toHaveLength(length);
  });

  it("should contain all numbers from 0 to N-1", () => {
    const length = 10 + Math.floor(Math.random() * 10);

    const result = getRandomArray(length);

    const sortedResult = [...result].sort((a, b) => a - b);

    expect(sortedResult).toEqual(Array.from({ length }, (_, index) => index));
  });

  it("should produce different results on multiple calls", () => {
    const length = 10 + Math.floor(Math.random() * 10);

    const result1 = getRandomArray(length);

    const result2 = getRandomArray(length);

    expect(result1).not.toEqual(result2);
  });

  it.each([0, 1, 2])(
    "should produce even distribution of a given element from the original array",
    value => {
      const length = 3;

      const tries = 30_000;

      const toleranceFactor = 3;

      const countByPosition = Array.from({ length }, () => 0);

      for (let i = 0; i < tries; i++) {
        const randomArray = getRandomArray(length);

        const position = randomArray.indexOf(value);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-type-assertion/no-type-assertion -- Ok
        countByPosition[position] = countByPosition[position]! + 1;
      }

      const expectedCount = tries / length;

      const squareDeviation = Math.sqrt(
        countByPosition.reduce(
          (sum, count) => sum + (count - expectedCount) ** 2,
          0
        )
      );

      const tolerance = toleranceFactor * Math.sqrt(expectedCount);

      expect(squareDeviation).toBeLessThanOrEqual(tolerance);
    }
  );
});
