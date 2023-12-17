import { BaseDay } from '../day';

type MirrorCell = '\\' | '/' | '-' | '|';
type LightCell = Direction | MirrorCell;
type Direction = 'N' | 'E' | 'S' | 'W';

type Input = (null | MirrorCell)[][];

const energize = (
  mirrorGrid: Input,
  start: [number, number, Direction] = [0, 0, 'E'],
) => {
  const lightGrid = mirrorGrid.map((line) =>
    line.map(() => new Set<LightCell>()),
  );

  const maxY = mirrorGrid.length;
  const maxX = mirrorGrid[0].length;
  const queue: [number, number, Direction][] = [start];

  while (queue.length) {
    const [x, y, d] = queue.pop()!;
    if (x < 0 || y < 0) continue;
    if (x >= maxX || y >= maxY) continue;

    const lightCell = lightGrid[y][x];
    const mirrorCell = mirrorGrid[y][x];

    if (lightCell.has(d)) {
      continue;
    } else {
      lightCell.add(d);
    }

    let directions: null | Direction[] = null;

    if (mirrorCell === '-' && ['N', 'S'].includes(d)) {
      directions = ['E', 'W'];
    } else if (mirrorCell === '|' && ['E', 'W'].includes(d)) {
      directions = ['N', 'S'];
    } else if (mirrorCell === '/') {
      if (d === 'E') {
        directions = ['N'];
      } else if (d === 'N') {
        directions = ['E'];
      } else if (d === 'S') {
        directions = ['W'];
        queue.push([x - 1, y, 'W']);
      } else {
        // 'W'
        directions = ['S'];
      }
    } else if (mirrorCell === '\\') {
      if (d === 'E') {
        directions = ['S'];
      } else if (d === 'N') {
        directions = ['W'];
      } else if (d === 'S') {
        directions = ['E'];
      } else {
        // W
        directions = ['N'];
      }
    }
    if (directions === null) {
      directions = [d];
    }

    directions.forEach((d) => {
      if (d === 'E') {
        queue.push([x + 1, y, d]);
      } else if (d === 'W') {
        queue.push([x - 1, y, d]);
      } else if (d === 'N') {
        queue.push([x, y - 1, d]);
      } else if (d === 'S') {
        queue.push([x, y + 1, d]);
      }
    });
  }

  return lightGrid
    .map((line) => line.filter((c) => c.size > 0).length)
    .reduce((s, v) => s + v);
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input
      .trim()
      .split('\n')
      .map((line) =>
        [...line.trim()].map((c) => (c === '.' ? null : (c as MirrorCell))),
      );
  }

  async partOne(): Promise<number> {
    const mirrorGrid = this.input;
    return energize(mirrorGrid);
  }

  async partTwo(): Promise<number> {
    const grid = this.input;

    const startPoints: [number, number, Direction][] = [];
    for (let x = 0; x < grid[0].length; x++) {
      startPoints.push([x, 0, 'S']);
      startPoints.push([x, grid.length - 1, 'N']);
    }
    for (let y = 0; y < grid.length; y++) {
      startPoints.push([0, y, 'E']);
      startPoints.push([grid[0].length - 1, y, 'W']);
    }

    const scores = startPoints.map((start) => energize(grid, start));
    return scores.reduce((a, b) => Math.max(a, b));
  }
}

export default Day;
