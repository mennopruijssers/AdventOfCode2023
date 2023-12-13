import { describe, expect, test } from '@jest/globals';
import Day, { Cell, findReflection, isReflection } from './day-13';
import { dayRunner, dayVerifier } from './test-util';

describe('is reflection', () => {
  test('1', () => {
    expect(isReflection([...'###'] as Cell[], [...'####'] as Cell[])).toBe(
      true,
    );
    expect(isReflection([...'####'] as Cell[], [...'###'] as Cell[])).toBe(
      true,
    );
    expect(isReflection([...'##.'] as Cell[], [...'.##'] as Cell[])).toBe(true);
    expect(isReflection([...'.#.'] as Cell[], [...'.#.'] as Cell[])).toBe(true);
    expect(isReflection([...'.##.'] as Cell[], [...'.##'] as Cell[])).toBe(
      true,
    );
    expect(isReflection([...'.#.'] as Cell[], [...'.#.#'] as Cell[])).toBe(
      true,
    );
  });
});
describe('find reflection', () => {
  test.each([
    [
      `#.##..##.
    ..#.##.#.
    ##......#
    ##......#
    ..#.##.#.
    ..##..##.
    #.#.##.#.`,
      { direction: 'vertical', index: 5 },
    ],
    [
      `
    #...##..#
    #....#..#
    ..##..###
    #####.##.
    #####.##.
    ..##..###
    #....#..#`,
      { direction: 'horizontal', index: 4 },
    ],
  ])('example %#', (input, expected) => {
    const grid = input
      .trim()
      .split('\n')
      .map((line) => [...line.trim()] as Cell[]);
    expect(findReflection(grid)).toStrictEqual(expected);
  });
});

const example = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;
dayRunner(Day, example, 405, 400);

dayVerifier(13, 35521, 34795);
