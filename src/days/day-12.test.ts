import { describe, expect, test } from '@jest/globals';
import Day, { countOptions, parseLine, unfold } from './day-12';
import { dayRunner, dayVerifier } from './test-util';

describe('countOptions', () => {
  test.each([
    ['???.### 1,1,3', 1, 1],
    ['.??..??...?##. 1,1,3', 4, 16384],
    ['?#?#?#?#?#?#?#? 1,3,1,6', 1, 1],
    ['????.#...#... 4,1,1', 1, 16],
    ['????.######..#####. 1,6,5', 4, 2500],
    ['?###???????? 3,2,1', 10, 506250],
  ])('test %#', (input, expected, unfoldedExpected) => {
    const line = parseLine(input);
    expect(countOptions(line, new Map())).toBe(expected);

    const unfolded = unfold(line);
    expect(countOptions(unfolded, new Map())).toBe(unfoldedExpected);
  });
});

const example = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
dayRunner(Day, example, 21, 525152);

dayVerifier(12, 7843, 10153896718999);
