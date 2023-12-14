import { BaseDay } from '../day';

type Cell = 'O' | '#' | '.';
type Input = Cell[][];
const directions: Direction[] = ['N', 'W', 'S', 'E'];
type Direction = 'N' | 'E' | 'S' | 'W';
export const parseInput = (input: string): Input => {
  const cells = input
    .trim()
    .split('\n')
    .map((line) => [...line.trim()] as Cell[]);
  return cells;
};

export const fullCycle = (grid: Cell[][]) => {
  for (const d of directions) {
    tiltAndScoreGrid(grid, d);
  }
  return grid;
};

export const tiltAndScoreGrid = (
  grid: Cell[][],
  direction: Direction = 'N',
): number => {
  const isVertical = ['N', 'S'].includes(direction);
  const columns = isVertical ? grid[0].length : grid.length;
  const rows = isVertical ? grid.length : grid[0].length;
  const reverse = ['S', 'E'].includes(direction);
  const maxCs = new Array<number>(columns).fill(reverse ? grid.length : -1);
  let score = 0;
  for (
    let c = reverse ? columns - 1 : 0;
    reverse ? c >= 0 : c < columns;
    reverse ? c-- : c++
  ) {
    for (
      let r = reverse ? rows - 1 : 0;
      reverse ? r >= 0 : r < rows;
      reverse ? r-- : r++
    ) {
      const cell = isVertical ? grid[c][r] : grid[r][c];
      if (cell === '#') {
        maxCs[r] = c;
      } else if (cell === 'O') {
        const newC = reverse ? maxCs[r] - 1 : maxCs[r] + 1;
        if (isVertical) {
          grid[c][r] = '.';
          grid[newC][r] = cell;
        } else {
          grid[r][c] = '.';
          grid[r][newC] = cell;
        }
        maxCs[r] = newC;
        score += grid.length - newC;
      }
    }
  }

  return score;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return parseInput(input);
  }

  async partOne(): Promise<number> {
    const grid = this.input.map((r) => [...r]);
    return tiltAndScoreGrid(grid);
  }

  async partTwo(): Promise<number> {
    const cycleMap = new Map<string, number>();

    const grid = this.input.map((r) => [...r]);
    const end = 1_000_000_000;
    let cycleFound = false;
    for (let i = 1; i <= end; i++) {
      fullCycle(grid);
      const gridString = grid.map((line) => line.join('')).join('\n');
      if (!cycleFound && cycleMap.has(gridString)) {
        const previousCycle = cycleMap.get(gridString)!;
        const period = i - previousCycle;
        i = end - ((end - previousCycle) % period);
        cycleFound = true;
      } else {
        cycleMap.set(gridString, i);
      }
    }

    let score = 0;
    for (let y = 0; y < grid.length; y++) {
      const numberOfRocks = grid[y].filter((c) => c === 'O').length;
      score += numberOfRocks * (grid.length - y);
    }
    return score;
  }
}

export default Day;
