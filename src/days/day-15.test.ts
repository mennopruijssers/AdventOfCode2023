import { describe, expect, test } from '@jest/globals';
import Day, { Box, generateHash, runInstruction } from './day-15';
import { dayRunner, dayVerifier } from './test-util';

const example = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

test.each([
  ['rn=1', 30],
  ['cm-', 253],
  ['qp=3', 97],
  ['cm=2', 47],
  ['qp-', 14],
  ['pc=4', 180],
  ['ot=9', 9],
  ['ab=5', 197],
  ['pc-', 48],
  ['pc=6', 214],
  ['ot=7', 231],
])('hash %s', (input, expected) => {
  expect(generateHash(input)).toBe(expected);
});
dayRunner(Day, example, 1320, 145);

describe('runInstruction', () => {
  const boxes: Box[] = Array(256)
    .fill(null)
    .map(() => []);

  test('step 1', () => {
    runInstruction('rn=1', boxes);
    expect(boxes[0]).toStrictEqual([['rn', 1]]);
  });

  test('step 2', () => {
    runInstruction('cm-', boxes);
    expect(boxes[0]).toStrictEqual([['rn', 1]]);
  });

  test('step 3', () => {
    runInstruction('qp=3', boxes);
    expect(boxes[0]).toStrictEqual([['rn', 1]]);
    expect(boxes[1]).toStrictEqual([['qp', 3]]);
  });

  test('step 4', () => {
    runInstruction('cm=2', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[1]).toStrictEqual([['qp', 3]]);
  });

  test('step 5', () => {
    runInstruction('qp-', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[1]).toStrictEqual([]);
  });

  test('step 6', () => {
    runInstruction('pc=4', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([['pc', 4]]);
  });

  test('step 7', () => {
    runInstruction('ot=9', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([
      ['pc', 4],
      ['ot', 9],
    ]);
  });

  test('step 8', () => {
    runInstruction('ab=5', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([
      ['pc', 4],
      ['ot', 9],
      ['ab', 5],
    ]);
  });

  test('step 9', () => {
    runInstruction('pc-', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([
      ['ot', 9],
      ['ab', 5],
    ]);
  });

  test('step 10', () => {
    runInstruction('pc=6', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([
      ['ot', 9],
      ['ab', 5],
      ['pc', 6],
    ]);
  });

  test('step 10', () => {
    runInstruction('ot=7', boxes);
    expect(boxes[0]).toStrictEqual([
      ['rn', 1],
      ['cm', 2],
    ]);
    expect(boxes[3]).toStrictEqual([
      ['ot', 7],
      ['ab', 5],
      ['pc', 6],
    ]);
  });
});

dayVerifier(15, 495972, 245223);
