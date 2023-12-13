import { BaseDay } from '../day';
import { notEmpty } from '../utils/predicates';

type Input = Grid[];
type Grid = Line[];
type Line = Cell[];
export type Cell = '.' | '#';

export const isReflection = (a: Line, b: Line): boolean => {
  const diff = countDifferences(a, b);
  return diff === 0;
};

const countDifferences = (a: Line, b: Line) => {
  let diff = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[a.length - 1 - i] !== b[i]) {
      diff++;
    }
  }
  return diff;
};
export const findReflection = (
  grid: Grid,
  allowedDifferences = 0,
): { direction: 'vertical' | 'horizontal'; index: number } => {
  for (let x = 1; x < grid[0].length; x++) {
    let differences = 0;
    for (let y = 0; y < grid.length; y++) {
      const left = Array(x)
        .fill(0)
        .map((_, index) => {
          return grid[y][index];
        });
      const right = Array(x)
        .fill(0)
        .map((_, index) => {
          if (grid[y].length > x + index) {
            return grid[y][x + index];
          } else {
            return undefined;
          }
        })
        .filter(notEmpty);

      const diff = countDifferences(left, right);
      differences += diff;
      if (differences > allowedDifferences) {
        break;
      }
    }

    if (differences === allowedDifferences) {
      return { direction: 'vertical', index: x };
    }
  }

  for (let y = 1; y < grid.length; y++) {
    let differences = 0;

    for (let x = 0; x < grid[0].length; x++) {
      const top = Array(y)
        .fill(0)
        .map((_, index) => {
          return grid[index][x];
        });
      const bottom = Array(y)
        .fill(0)
        .map((_, index) => {
          if (grid.length > y + index) {
            return grid[y + index][x];
          } else {
            return undefined;
          }
        })
        .filter(notEmpty);
      const diff = countDifferences(top, bottom);
      differences += diff;
      if (differences > allowedDifferences) {
        break;
      }
    }

    if (differences === allowedDifferences) {
      return { direction: 'horizontal', index: y };
    }
  }

  //istanbul ignore next
  throw new Error('no smudge found');
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n\n').map((gridInput) => {
      return gridInput
        .trim()
        .split('\n')
        .map((line) => [...line.trim()] as Cell[]);
    });
  }

  async partOne(): Promise<number> {
    const reflections = this.input.map((g) => findReflection(g));

    const scores = reflections.map((r) => {
      if (r.direction === 'vertical') {
        return r.index;
      } else {
        return r.index * 100;
      }
    });

    return scores.reduce((sum, v) => sum + v);
  }

  async partTwo(): Promise<number> {
    const reflections = this.input.map((g) => findReflection(g, 1));
    const scores = reflections.map((r) => {
      if (r.direction === 'vertical') {
        return r.index;
      } else {
        return r.index * 100;
      }
    });

    return scores.reduce((sum, v) => sum + v);
  }
}

export default Day;
