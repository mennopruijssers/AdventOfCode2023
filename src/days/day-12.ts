import { BaseDay } from '../day';

type Input = Line[];
type Line = {
  conditions: Condition[];
  damagedCounts: number[];
};

type Condition = '.' | '#' | '?';

export const parseLine = (line: string): Line => {
  const [conditions, damagedCounts] = line.split(' ');

  return {
    conditions: [...conditions] as Condition[],
    damagedCounts: damagedCounts.split(',').map((c) => parseInt(c)),
  };
};

export const unfold = (line: Line): Line => {
  const conditions = [...line.conditions];
  const damagedCounts = [...line.damagedCounts];

  for (let i = 1; i < 5; i++) {
    conditions.push('?');
    conditions.push(...line.conditions);
    damagedCounts.push(...line.damagedCounts);
  }

  return { conditions, damagedCounts };
};

export const countOptions = (
  { conditions, damagedCounts }: Line,
  cache: Map<string, number>,
): number => {
  if (conditions.length === 0) {
    return damagedCounts.length > 0 ? 0 : 1;
  }
  if (damagedCounts.length === 0) {
    return conditions.includes('#') ? 0 : 1;
  }
  const key = `${conditions.join('')}-${damagedCounts.join(',')}`;

  if (cache.has(key)) {
    return cache.get(key)!;
  }
  let result = 0;
  const firstSpring = conditions[0];

  //  if first spring is not damaged
  if (firstSpring !== '#') {
    result += countOptions(
      { conditions: conditions.slice(1), damagedCounts },
      cache,
    );
  }
  // if first spring is damaged or unknown
  if (firstSpring !== '.') {
    const [firstGroup, ...rest] = damagedCounts;
    // if there's still a possibility
    if (
      firstGroup <= conditions.length &&
      !conditions.slice(0, firstGroup).includes('.') &&
      (firstGroup === conditions.length || conditions[firstGroup] !== '#')
    ) {
      result += countOptions(
        { conditions: conditions.slice(firstGroup + 1), damagedCounts: rest },
        cache,
      );
    }
  }
  cache.set(key, result);

  return result;
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    return input.split('\n').map((line) => parseLine(line));
  }

  async partOne(): Promise<number> {
    return this.input
      .map((line) => countOptions(line, new Map()))
      .reduce((sum, v) => sum + v);
  }

  async partTwo(): Promise<number> {
    return this.input
      .map((line) => unfold(line))
      .map((line) => countOptions(line, new Map()))
      .reduce((sum, v) => sum + v);
  }
}

export default Day;
