import Day, { calcDistance } from './day-06';
import { dayRunner, dayVerifier } from './test-util';
import { describe, expect, test } from 'vitest';

const example = `Time:      7  15   30
Distance:  9  40  200`;

describe('calcDistance', () => {
  test.each([
    [0, 0],
    [1, 6],
    [2, 10],
    [3, 12],
    [4, 12],
    [5, 10],
    [6, 6],
    [7, 0],
  ])('holdTime: %i, distance: %i', (holdTime, expected) => {
    expect(calcDistance(holdTime, 7)).toBe(expected);
  });
});

dayRunner(Day, example, 288, 71503);

dayVerifier(6, 1195150, 42550411);
