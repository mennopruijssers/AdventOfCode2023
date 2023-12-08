import { describe, expect, test } from '@jest/globals';
import { leastCommonMultiple } from './math';

describe('leastCommonMultiple', () => {
  test.each([
    [[3, 5, 7, 15], 105],
    [[6, 4, 10296, 936, 1287, 792, 1], 10296],
  ])('%i', (input, expected) => {
    expect(leastCommonMultiple(input)).toBe(expected);
  });
});
