import { BaseDay } from '../day';
import { allPairs } from '../utils/arrays';
import { Point } from '../utils/types';

type Input = {
  galaxies: Point[];
};

export const calculateDistances = (galaxies: Point[], emptySpace: number) => {
  const [xSet, ySet] = galaxies.reduce(
    ([xSet, ySet], { x, y }) => {
      xSet.add(x);
      ySet.add(y);
      return [xSet, ySet];
    },
    [new Set<number>(), new Set<number>()],
  );

  const galaxyDistance = (a: Point, b: Point) => {
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);

    let distance = 0;
    for (let x = minX; x < maxX; x++) {
      if (!xSet.has(x)) {
        distance += emptySpace;
      } else {
        distance += 1;
      }
    }
    for (let y = minY; y < maxY; y++) {
      if (!ySet.has(y)) {
        distance += emptySpace;
      } else {
        distance += 1;
      }
    }

    return distance;
  };
  const allCombos = allPairs(galaxies);
  const distances = allCombos.map(([a, b]) => galaxyDistance(a, b));
  return distances.reduce((sum, v) => sum + v);
};
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const galaxyMap = input
      .trim()
      .split('\n')
      .map((line) => [...line.trim()] as ('.' | '#')[]);

    const galaxies: Point[] = [];
    for (let y = 0; y < galaxyMap.length; y++) {
      for (let x = 0; x < galaxyMap[y].length; x++) {
        if (galaxyMap[y][x] === '#') {
          galaxies.push({ x, y });
        }
      }
    }
    return { galaxies };
  }

  async partOne(): Promise<number> {
    const { galaxies } = this.input;
    return calculateDistances(galaxies, 2);
  }

  async partTwo(): Promise<number> {
    return calculateDistances(this.input.galaxies, 1_000_000);
  }
}

export default Day;
