import Day from './day-10';
import { dayRunner /*dayVerifier */ } from './test-util';

const example = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

dayRunner(Day, example, 8, undefined);

// dayRunner(Day, `...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........`, undefined, 4);

const _exampleP2 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;
// dayRunner(Day, exampleP2, undefined, 8)

// dayVerifier(10, 56, 42);
