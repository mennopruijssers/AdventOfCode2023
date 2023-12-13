import { describe, test, expect } from '@jest/globals';
import { allPairs } from '../arrays';

describe('allPairs', () => {
  test('returns all paris', () => {
    expect(allPairs(['apple', 'banana', 'lemon', 'orange'])).toStrictEqual([
      ['apple', 'banana'],
      ['apple', 'lemon'],
      ['apple', 'orange'],
      ['banana', 'lemon'],
      ['banana', 'orange'],
      ['lemon', 'orange'],
    ]);
  });
});
