import Day from './day-01';
import { dayRunner, dayVerifier } from './test-util';

const example = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

dayRunner(Day, example, 142);
dayRunner(
  Day,
  `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
  undefined,
  281,
);

dayVerifier(1, 56049, 54530);
