import { BaseDay } from '../day';

type Input = string[];
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n');
  }

  async partOne(): Promise<number> {
    const digits = this.input.map((line) => {
      const isDigit = (c: string) => c >= '0' && c <= '9';
      const firstDigit = [...line].find(isDigit);
      const lastDigit = [...line].reverse().find(isDigit);

      return parseInt(`${firstDigit}${lastDigit}`, 10);
    });

    return digits.reduce((sum, n) => sum + n);
  }

  async partTwo(): Promise<number> {
    const digits = this.input.map((line) => {
      const digits = [
        'one',
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        '0',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
      ];

      const find = (fromStart: boolean) => {
        const res = digits
          .map<[number, number]>((d, index) => [
            index + 1,
            fromStart ? line.indexOf(d) : line.lastIndexOf(d),
          ])
          .filter((r) => r[1] > -1)
          .reduce((curr, prev) => {
            if (fromStart && curr[1] < prev[1]) return curr;
            if (!fromStart && curr[1] > prev[1]) return curr;
            return prev;
          });

        if (res[0] <= 9) return res[0];
        return res[0] - 10;
      };

      const firstDigit = find(true);
      const lastDigit = find(false);
      return parseInt(`${firstDigit}${lastDigit}`, 10);
    });

    return digits.reduce((sum, n) => sum + n);
  }
}

export default Day;
