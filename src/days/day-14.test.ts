import { expect, test } from '@jest/globals';
import Day, { fullCycle, parseInput } from './day-14';
import { dayRunner, dayVerifier } from './test-util';

const example = `
O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....
`;

dayRunner(Day, example, 136, 64);

test('part 2', () => {
  const grid = parseInput(example);
  const toString = () => grid.map((l) => l.join('')).join('\n');
  const stripSpaces = (grid: string) => grid.trim().replaceAll(' ', '');

  fullCycle(grid);
  expect(toString()).toBe(
    stripSpaces(`
  .....#....
  ....#...O#
  ...OO##...
  .OO#......
  .....OOO#.
  .O#...O#.#
  ....O#....
  ......OOOO
  #...O###..
  #..OO#....`),
  );

  fullCycle(grid);
  expect(toString()).toBe(
    stripSpaces(`
  .....#....
  ....#...O#
  .....##...
  ..O#......
  .....OOO#.
  .O#...O#.#
  ....O#...O
  .......OOO
  #..OO###..
  #.OOO#...O`),
  );

  fullCycle(grid);
  expect(toString()).toBe(
    stripSpaces(`
  .....#....
  ....#...O#
  .....##...
  ..O#......
  .....OOO#.
  .O#...O#.#
  ....O#...O
  .......OOO
  #...O###.O
  #.OOO#...O`),
  );
});
dayVerifier(14, 109661, 90176);
