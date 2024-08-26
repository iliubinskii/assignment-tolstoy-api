/*
Task:
We have N visitors.
Each visitor has a popularity score.
We want to distribute candies to these visitors.
The rules are as follows:
- Each visitor receives at least one candy.
- A visitor with a higher popularity score compared to his immediate neighbor gets more candies.
- A visitor with the same popularity score compared to his immediate neighbor gets the same number of candies.
- The total number of candies should be minimized.

Solution:
1. Reduce the problem to the situation where all neighboring elements have different popularity score.
2. Determine local minimums and maximums (i.e. popularity score is less or greater than both immediate neighbors).
3. Each minimum receives 1 candy.
4. Go in each direction till the nearest maximum bumping the number of candies.

Complexity:
- When grouping visitors with the same popularity score:
  - Each element is visited once.
- When scanning for local minimums:
  - Each element is visited once.
- When bumping from minimums to nearest maximums:
  - Minimums are not visited.
  - Maximums are visited twice (we can approach them from the left or right).
  - Other elements are visited once.
- Therefore the time complexity is O(N).
*/

/**
 * Distributes candies to the visitors according to their popularity.
 * @param visitors - The array that holds popularity for each visitor.
 * @returns The array that holds the number of candies each visitor will get.
 */
export function distributeCandies(
  visitors: readonly number[]
): readonly number[] {
  // Combine visitors with the same popularity score into groups.
  // This reduces the problem to the situation where all neighboring elements (groups)
  // have different popularity score.
  // The initial number of candies for each visitor is 1.
  const groups = combineIntoGroups(visitors);

  // Whenever we are at the local minimum, we need to bump the candies to the left and right.
  for (const [index, group] of groups.entries())
    if (isLocalMinimum(group, index, groups))
      for (const direction of directions) bumpCandies(index, direction, groups);

  // Rollback from groups back to visitors and return the number of candies each visitor will get.
  return groups.flatMap(({ candies, count }) =>
    Array.from({ length: count }, () => candies)
  );
}

/**
 * Bump the candies to the left or right.
 * @param index - The index of the group to start from.
 * @param direction - The direction to bump the candies.
 * @param groups - The array that holds the groups.
 */
function bumpCandies(
  index: number,
  direction: -1 | 1,
  groups: readonly Group[]
): void {
  let offset = 1;

  let currentIndex = index + direction * offset;

  let currentGroup = groups[currentIndex];

  while (currentGroup) {
    currentGroup.candies = Math.max(currentGroup.candies, offset + 1);

    if (isLocalMaximum(currentGroup, currentIndex, groups)) break;

    offset++;
    currentIndex = index + direction * offset;
    currentGroup = groups[currentIndex];
  }
}

/**
 * Combines visitors with the same popularity into groups.
 * @param visitors - The array that holds popularity for each visitor.
 * @returns The array that holds the groups.
 */
function combineIntoGroups(visitors: readonly number[]): readonly Group[] {
  // eslint-disable-next-line misc/typescript/prefer-readonly-array -- Ok
  const groups: Group[] = [];

  for (const popularity of visitors) {
    const lastGroup = groups.at(-1);

    if (lastGroup && lastGroup.popularity === popularity) lastGroup.count++;
    else groups.push({ candies: 1, count: 1, popularity });
  }

  return groups;
}

/**
 * Check if the group at the specified index is a local minimum.
 * @param group - The group to check.
 * @param index - The index of the group to check.
 * @param groups - The array that holds the groups.
 * @returns True if the group is a local minimum, false otherwise.
 */
function isLocalMinimum(
  group: Group,
  index: number,
  groups: readonly Group[]
): boolean {
  {
    const previousGroup = groups[index - 1];

    if (previousGroup && previousGroup.popularity < group.popularity)
      return false;
  }

  {
    const nextGroup = groups[index + 1];

    if (nextGroup && nextGroup.popularity < group.popularity) return false;
  }

  return true;
}

/**
 * Check if the group at the specified index is a local maximum.
 * @param group - The group to check.
 * @param index - The index of the group to check.
 * @param groups - The array that holds the groups.
 * @returns True if the group is a local maximum, false otherwise.
 */
function isLocalMaximum(
  group: Group,
  index: number,
  groups: readonly Group[]
): boolean {
  {
    const previousGroup = groups[index - 1];

    if (previousGroup && previousGroup.popularity > group.popularity)
      return false;
  }

  {
    const nextGroup = groups[index + 1];

    if (nextGroup && nextGroup.popularity > group.popularity) return false;
  }

  return true;
}

const directions = [-1, 1] as const;

interface Group {
  // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
  candies: number;
  // eslint-disable-next-line misc/typescript/prefer-readonly-property -- Ok
  count: number;
  readonly popularity: number;
}
