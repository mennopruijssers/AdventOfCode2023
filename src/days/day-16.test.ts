import Day from './day-16';
import { dayRunner, dayVerifier } from './test-util';

const example = `
.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

dayRunner(Day, example, 46, 51);

dayVerifier(16, 8323, 8491);
