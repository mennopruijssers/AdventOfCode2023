import { BaseDay } from '../day';

type Input = Card[];

type Card = {
  index: number;
  winningNumbers: number[];
  numbers: number[];
};
const numberOfRightNumbers = ({ winningNumbers, numbers }: Card) => {
  return numbers.reduce((count, current) => {
    if (winningNumbers.includes(current)) return count + 1;
    return count;
  }, 0);
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const parseCard = (line: string) => {
      const [prefix, suffix] = line.split(/: +/);
      const [index] = prefix.split(/ +/).reverse();
      const [winningNumbers, numbers] = suffix
        .split(/ +\| +/)
        .map((p) => p.split(/ +/).map((n) => parseInt(n, 10)));

      return {
        index: parseInt(index, 10),
        winningNumbers,
        numbers,
      };
    };

    return input.split('\n').map(parseCard);
  }

  async partOne(): Promise<number> {
    const scores = this.input
      .map(numberOfRightNumbers)
      .map((correctNumbers) => {
        if (correctNumbers === 0) return 0;
        return Math.pow(2, correctNumbers - 1);
      });

    return scores.reduce((sum, c) => sum + c);
  }

  async partTwo(): Promise<number> {
    const cards = this.input.map((c) => ({ ...c, count: 1 }));

    cards.forEach((card, index) => {
      const rightCount = numberOfRightNumbers(card);
      for (let i = 1; i < rightCount + 1; i++) {
        cards[index + i].count += card.count;
      }
    });

    return cards.map((c) => c.count).reduce((sum, c) => sum + c);
  }
}

export default Day;
