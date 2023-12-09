import { describe, expect, it } from '@jest/globals';
import Day, { calculateNext, calculatePrevious } from './day-09';
import { dayRunner, dayVerifier } from './test-util';

const example = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

describe('calculateNext', () => {
  it.each([
    [[0, 3, 6, 9, 12, 15], 18],
    [[1, 3, 6, 10, 15, 21], 28],
    [[10, 13, 16, 21, 30, 45], 68],
  ])(`case %#`, (numbers, expected) => {
    expect(calculateNext(numbers)).toBe(expected);
  });
});

describe('calculatePrevious', () => {
  it.each([
    [[0, 3, 6, 9, 12, 15], -3],
    [[1, 3, 6, 10, 15, 21], 0],
    [[10, 13, 16, 21, 30, 45], 5],
  ])(`case %#`, (numbers, expected) => {
    expect(calculatePrevious(numbers)).toBe(expected);
  });
});
dayRunner(Day, example, 114, 2);

dayVerifier(9, 1842168671, 903);
