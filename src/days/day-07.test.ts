import { describe, expect, test } from '@jest/globals';
import Day, { Card, typeForCards1, typeForCards2 } from './day-07';
import { dayRunner, dayVerifier } from './test-util';

const example = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

describe('typeForCards1', () => {
  test.each([
    ['AAAAA', 'FiveOfAKind'],
    ['AA8AA', 'FourOfAKind'],
    ['23332', 'FullHouse'],
    ['TTT98', 'ThreeOfAKind'],
    ['23432', 'TwoPair'],
    ['A23A4', 'OnePair'],
    ['23456', 'HighCard'],
  ])('%s = %s', (cards, expected) => {
    expect(typeForCards1([...cards] as Card[])).toBe(expected);
  });
});

describe('typeForCards2', () => {
  test.each([
    ['AAAAA', 'FiveOfAKind'],
    ['AA8AA', 'FourOfAKind'],
    ['23332', 'FullHouse'],
    ['TTT98', 'ThreeOfAKind'],
    ['23432', 'TwoPair'],
    ['A23A4', 'OnePair'],
    ['23456', 'HighCard'],
    ['QJJQ2', 'FourOfAKind'],
  ])('%s = %s', (cards, expected) => {
    expect(typeForCards2([...cards] as Card[])).toBe(expected);
  });
});

dayRunner(Day, example, 6440, 5905);

dayVerifier(7, 250474325, 248909434);
