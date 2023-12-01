import { BaseDay } from '../day';

type Input = string[];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n');
  }

  async partOne(): Promise<number> {
    return 42;
  }

  async partTwo(): Promise<number> {
    return 42;
  }
}

export default Day;
