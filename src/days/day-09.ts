import { BaseDay } from '../day';

type Input = number[][];

export const calculateNext = (numbers: number[]): number => {
  if (numbers.every((n) => n === 0)) {
    return 0;
  }
  const last = numbers[numbers.length - 1];
  const diffs = numbers.slice(1).map((n, index) => n - numbers[index]);
  const next = calculateNext(diffs);
  return last + next;
};

export const calculatePrevious = (numbers: number[]): number => {
  if (numbers.every((n) => n === 0)) {
    return 0;
  }
  const first = numbers[0];
  const diffs = numbers.slice(1).map((n, index) => n - numbers[index]);
  const prev = calculatePrevious(diffs);
  return first - prev;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input
      .split('\n')
      .map((line) => line.split(/ +/).map((s) => parseInt(s)));
  }

  async partOne(): Promise<number> {
    const nextNumbers = this.input.map((line) => {
      return calculateNext(line);
    });

    return nextNumbers.reduce((sum, n) => sum + n);
  }

  async partTwo(): Promise<number> {
    const previousNumbers = this.input.map((line) => {
      return calculatePrevious(line);
    });

    return previousNumbers.reduce((sum, n) => sum + n);
  }
}

export default Day;
