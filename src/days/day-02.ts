import { BaseDay } from '../day';

type Input = Game[];

type Game = {
  index: number;
  rounds: Round[];
};
type Round = Partial<Record<Color, number>>;
type Color = 'red' | 'green' | 'blue';

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const parseRound = (string: string) => {
      const parts = string.split(', ');

      return parts.reduce<Round>((acc, p) => {
        const [amount, color] = p.split(' ');
        acc[color as Color] = parseInt(amount);
        return acc;
      }, {});
    };
    const parseGame = (line: string) => {
      const parts = line.split(': ');
      const index = parseInt(parts[0].substring('Game '.length));
      const rounds = parts[1].split('; ').map(parseRound);
      return { index, rounds };
    };

    return input.split('\n').map(parseGame);
  }

  async partOne(): Promise<number> {
    const needed = { red: 12, green: 13, blue: 14 };

    const possible = this.input.filter((g) => {
      return g.rounds.every((round) => {
        return Object.entries(round).every(([color, amount]) => {
          return needed[color as Color] >= amount;
        });
      });
    });
    return possible.map(({ index }) => index).reduce((sum, cur) => sum + cur);
  }

  async partTwo(): Promise<number> {
    const minPerGame = this.input.map<Record<Color, number>>((game) => {
      return game.rounds.reduce<Record<Color, number>>(
        (min, r) => {
          return {
            red: Math.max(min.red || 0, r.red || 0),
            green: Math.max(min.green || 0, r.green || 0),
            blue: Math.max(min.blue || 0, r.blue || 0),
          };
        },
        { red: 0, green: 0, blue: 0 },
      );
    });

    const powers = minPerGame.map(({ red, green, blue }) => red * green * blue);

    return powers.reduce((sum, c) => sum + c);
  }
}

export default Day;
