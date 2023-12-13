import { describe, expect, it } from '@jest/globals';
import Day, { calculateDistances } from './day-11';
import { dayRunner, dayVerifier } from './test-util';

const example = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

dayRunner(Day, example, 374, undefined);

describe('example part 2', () => {
  const galaxies = new Day(example).input.galaxies;

  it('10 times', () => {
    expect(calculateDistances(galaxies, 10)).toBe(1030);
  });

  it('100 times', () => {
    expect(calculateDistances(galaxies, 100)).toBe(8410);
  });
});

dayVerifier(11, 9769724, 603020563700);
