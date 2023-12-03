import { BaseDay } from '../day';
import { Point } from '../utils/types';

const isNumber = (c: string) => {
  return c >= '0' && c <= '9';
};

const hasAdjacentSymbol = (grid: string[][], x: number, y: number) => {
  const pointsToCheck = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];

  return pointsToCheck.some(([x, y]) => {
    if (x < 0 || y < 0) return false;
    if (y >= grid.length) return false;

    const line = grid[y];
    if (x >= line.length) return false;

    const c = line[x];

    if (isNumber(c)) return false;
    if (c === '.') return false;

    return true;
  });
};

const adjacentGearPoints = (
  grid: string[][],
  x: number,
  y: number,
): Point[] => {
  const pointsToCheck = [
    [x - 1, y - 1],
    [x - 1, y],
    [x - 1, y + 1],
    [x, y - 1],
    [x, y + 1],
    [x + 1, y - 1],
    [x + 1, y],
    [x + 1, y + 1],
  ];
  return pointsToCheck
    .filter(([x, y]) => {
      if (x < 0 || y < 0) return false;
      if (y >= grid.length) return false;

      const line = grid[y];
      if (x >= line.length) return false;

      const c = line[x];
      return c === '*';
    })
    .map(([x, y]) => ({ x, y }));
};

type Input = string[][];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map((l) => [...l]);
  }

  async partOne(): Promise<number> {
    const grid = this.input;

    const numbers: number[] = [];
    let current = '';
    let adjacentSymbol = false;

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x];
        if (isNumber(char)) {
          if (!adjacentSymbol) {
            adjacentSymbol = hasAdjacentSymbol(grid, x, y);
          }

          current = current + char;
          continue;
        } else {
          if (adjacentSymbol) {
            numbers.push(parseInt(current, 10));
          }
          current = '';
          adjacentSymbol = false;
        }
      }
      if (adjacentSymbol) {
        numbers.push(parseInt(current, 10));
      }
      current = '';
      adjacentSymbol = false;
    }
    return numbers.reduce((sum, c) => sum + c);
  }

  async partTwo(): Promise<number> {
    const grid = this.input;

    let current = '';
    const adjacentGearSet = new Set<string>();

    const gears: Record<string, number[]> = {};

    const addAndReset = () => {
      const n = parseInt(current, 10);
      adjacentGearSet.forEach((p) => {
        if (gears[p]) {
          gears[p].push(n);
        } else {
          gears[p] = [n];
        }
      });
      current = '';
      adjacentGearSet.clear();
    };

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const char = grid[y][x];
        if (isNumber(char)) {
          adjacentGearPoints(grid, x, y).forEach((p) =>
            adjacentGearSet.add(JSON.stringify(p)),
          );
          current = current + char;
          continue;
        } else {
          addAndReset();
        }
      }
      addAndReset();
    }

    return Object.values(gears)
      .filter((numbers) => numbers.length === 2)
      .map(([a, b]) => a * b)
      .reduce((sum, c) => sum + c);
  }
}

export default Day;
