import Day from './day-08';
import { dayRunner, dayVerifier } from './test-util';

const example = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

dayRunner(Day, example, 2, undefined);

const example2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

dayRunner(Day, example2, 6, undefined);

const examplePart2 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;
dayRunner(Day, examplePart2, undefined, 6);

dayVerifier(8, 19951, 16342438708751);
