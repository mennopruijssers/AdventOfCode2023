import { BaseDay } from '../day';

type Input = RaceRecord[];

type RaceRecord = {
  time: number;
  distance: number;
};

export const calcDistance = (holdTime: number, maxTime: number) => {
  return holdTime * (maxTime - holdTime);
};

export const findMinTime = (race: RaceRecord): number => {
  for (let i = 0; i < race.time; i++) {
    const distance = calcDistance(i, race.time);
    if (distance > race.distance) return i;
  }
  /* istanbul ignore next @preserve */
  throw new Error("can't win");
};

export const findMaxTime = (race: RaceRecord): number => {
  for (let i = race.time - 1; i >= 0; i--) {
    const distance = calcDistance(i, race.time);
    if (distance > race.distance) return i;
  }
  /* istanbul ignore next @preserve */
  throw new Error("can't win");
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const [timesLine, distancesLine] = input.split('\n');
    const times = timesLine
      .substring('Time:'.length)
      .trim()
      .split(/ +/)
      .map((n) => parseInt(n));
    const distances = distancesLine
      .substring('Distance:'.length)
      .trim()
      .split(/ +/)
      .map((n) => parseInt(n));

    return times.map((t, index) => {
      return { time: t, distance: distances[index] };
    });
  }

  async partOne(): Promise<number> {
    const minMaxTimes = this.input.map((r) => {
      const min = findMinTime(r);
      const max = findMaxTime(r);
      return { ...r, min, max };
    });

    const winningOptions = minMaxTimes.map(({ min, max }) => max - min + 1);

    return winningOptions.reduce((acc, c) => acc * c);
  }

  async partTwo(): Promise<number> {
    const [timeString, distanceString] = this.input.reduce(
      ([timeString, distanceString], { time, distance }) => {
        timeString = timeString + time.toString();
        distanceString = distanceString + distance.toString();
        return [timeString, distanceString];
      },
      ['', ''],
    );

    const race = {
      time: parseInt(timeString),
      distance: parseInt(distanceString),
    };
    const min = findMinTime(race);
    const max = findMaxTime(race);
    return max - min + 1;
  }
}

export default Day;
