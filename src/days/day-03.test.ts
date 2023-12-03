import Day from './day-03';
import { dayRunner, dayVerifier } from './test-util';

const example = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

dayRunner(Day, example, 4361, 467835);

dayVerifier(3, 514969, 78915902);
