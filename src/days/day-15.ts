import { BaseDay } from '../day';

type Input = string[];

export const generateHash = (input: string): number => {
  let calc = 0;

  for (let i = 0; i < input.length; i++) {
    calc += input.charCodeAt(i);
    calc *= 17;
    calc = calc % 256;
  }
  return calc;
};

export type Box = Lens[];
type Lens = [string, number];

export const runInstruction = (line: string, boxes: Box[]) => {
  type Match = { label: string; vocalLength: string; instruction: '=' | '-' };

  const match = line.match(
    /(?<label>\w+)(?<instruction>[=-])(?<vocalLength>\d*)/,
  );

  const { label, instruction, vocalLength } = match!.groups! as Match;
  const hash = generateHash(label);
  const box = boxes[hash];

  if (instruction === '=') {
    const existingLens = box.find((lens) => lens[0] === label);
    if (existingLens) {
      existingLens[1] = parseInt(vocalLength);
    } else {
      box.push([label, parseInt(vocalLength)]);
    }
  } else if (instruction === '-') {
    const lensIndex = box.findIndex((lens) => lens[0] === label);
    if (lensIndex > -1) {
      box.splice(lensIndex, 1);
    }
  }
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').flatMap((line) => line.split(','));
  }

  async partOne(): Promise<number> {
    return this.input.map((i) => generateHash(i)).reduce((sum, v) => sum + v);
  }

  async partTwo(): Promise<number> {
    const boxes: Box[] = Array(256)
      .fill(null)
      .map(() => []);

    this.input.forEach((line) => {
      runInstruction(line, boxes);
    });

    const lensScores = boxes.map((lenses, boxIndex) => {
      return lenses.map(([_label, focalLength], lensIndex) => {
        return (boxIndex + 1) * (lensIndex + 1) * focalLength;
      });
    });
    const boxScores = lensScores.map((scores) =>
      scores.reduce((s, v) => s + v, 0),
    );
    const totalScore = boxScores.reduce((s, v) => s + v);
    return totalScore;
  }
}

export default Day;
