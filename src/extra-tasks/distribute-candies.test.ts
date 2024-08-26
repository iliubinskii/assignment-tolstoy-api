import { describe, expect, it } from "@jest/globals";
import { distributeCandies } from "./distribute-candies.js";

describe("distributeCandies", () => {
  it("should distribute candies correctly for an ascending popularity sequence", () => {
    const visitors = [1, 2, 3, 4, 5];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1, 2, 3, 4, 5]);
  });

  it("should distribute candies correctly for a descending popularity sequence", () => {
    const visitors = [5, 4, 3, 2, 1];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([5, 4, 3, 2, 1]);
  });

  it("should give equal candies to visitors with the same popularity score", () => {
    const visitors = [2, 2, 2];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1, 1, 1]);
  });

  it("should distribute candies correctly for a mixed popularity sequence", () => {
    const visitors = [1, 3, 4, 5, 2, 3, 3, 1];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1, 2, 3, 4, 1, 2, 2, 1]);
  });

  it("should handle edge case with only one visitor", () => {
    const visitors = [5];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1]);
  });

  it("should handle edge case with two visitors of different popularity", () => {
    const visitors = [1, 2];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1, 2]);
  });

  it("should handle edge case with two visitors of the same popularity", () => {
    const visitors = [2, 2];

    const candies = distributeCandies(visitors);

    expect(candies).toEqual([1, 1]);
  });

  it("time complexity should be O(n)", () => {
    const baseSize = 20_000;

    const factor = 5;

    const minRatio = 3;

    const maxRatio = 6;

    const maxTime = 1000;

    const generateRandomArray = (size: number): readonly number[] =>
      Array.from({ length: size }, () => Math.floor(Math.random() * 100));

    const visitors1 = generateRandomArray(baseSize);

    const start1 = performance.now();

    distributeCandies(visitors1);

    const end1 = performance.now();

    const time1 = end1 - start1;

    const visitors2 = generateRandomArray(factor * baseSize);

    const start2 = performance.now();

    distributeCandies(visitors2);

    const end2 = performance.now();

    const time2 = end2 - start2;

    const timeRatio = time2 / time1;

    expect(timeRatio).toBeGreaterThan(minRatio);
    expect(timeRatio).toBeLessThan(maxRatio);
    expect(time1).toBeLessThan(maxTime);
    expect(time2).toBeLessThan(maxTime);
  });
});
