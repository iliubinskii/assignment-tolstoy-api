/*
Task:
Get random array of length N containing the numbers 0, 1, 2, ..., N-1 in random order.

Solution:
Fisher-Yates Shuffle algorithm is used to shuffle the array.
*/

/**
 * Get random array of length N containing the numbers 1, 2, 3, ..., N in random order.
 * @param length - The length of the array.
 * @returns The random array.
 */
export function getRandomArray(length: number): readonly number[] {
  const array = Array.from({ length }, (_, index) => index);

  for (let i = length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion, no-type-assertion/no-type-assertion -- Ok
    [array[i], array[randomIndex]] = [array[randomIndex]!, array[i]!];
  }

  return array;
}
