//istanbul ignore file: not covered by test
import { beforeAll, beforeEach, describe, expect, it } from '@jest/globals';
import { BaseDay } from '../day';
import * as fs from 'fs/promises';

type ValidatorFN<T> = (output: T) => void;
export function dayRunner<T1, T2>(
  DayType: new (input: string) => BaseDay<unknown, T1, T2>,
  example: string,
  partOne?: T1 | ValidatorFN<T1>,
  partTwo?: T2,
) {
  let day: BaseDay<unknown, T1, T2>;

  describe(`given ${example}`, () => {
    beforeEach(async () => {
      day = new DayType(example);
    });

    if (partOne !== undefined) {
      it('part 1', async () => {
        const output = await day.partOne();
        if (typeof partOne === 'function') {
          (partOne as ValidatorFN<T1>)(output);
        } else {
          expect(output).toBe(partOne);
        }
      });
    }

    if (partTwo !== undefined) {
      it('part 2', async () => {
        const output = await day.partTwo(partOne as T1);
        expect(output).toBe(partTwo);
      });
    }
  });
}

export function slowTest(fn: () => unknown, name?: string): void {
  //istanbul ignore next
  if (process.env['ENABLE_SLOW_TESTS'] === '1') {
    fn();
  }
  //istanbul ignore next
  else {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    it.skip('slow tests skipped: ' + name, () => {});
  }
}

export function dayVerifier<T1, T2>(
  dayNumber: number,
  expectOutput1: T1,
  expectedOutput2?: T2,
) {
  const paddedDay = dayNumber.toString().padStart(2, '0');

  describe(`verify day ${dayNumber}`, () => {
    let day: BaseDay<unknown, T1, T2>;
    beforeAll(async () => {
      const input = await fs.readFile(`./inputs/day-${paddedDay}.txt`, {
        encoding: 'utf-8',
      });
      const DayType = (await import(`../days/day-${paddedDay}`)).default;

      day = new DayType(input);
    });

    let actualOutput1: T1;
    it('right answer to part 1', async () => {
      actualOutput1 = await day.partOne();

      expect(actualOutput1).toBe(expectOutput1);
    });

    if (expectedOutput2 !== undefined) {
      it('right answer to part 2', async () => {
        const output2 = await day.partTwo(actualOutput1);

        expect(output2).toBe(expectedOutput2);
      });
    }
  });
}
