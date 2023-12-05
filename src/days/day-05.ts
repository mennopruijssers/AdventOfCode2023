import { assert } from 'console';
import { BaseDay } from '../day';
import { createChunks } from '../utils/chunks';

const maps = [
  'seedToSoilMap',
  'soilToFertilizerMap',
  'fertilizerToWaterMap',
  'waterToLightMap',
  'lightToTemperatureMap',
  'temperatureToHumidityMap',
  'humidityToLocationMap',
] as (keyof Input)[];

export class RangeMap {
  ranges: [number, number, number][];
  constructor(ranges: [number, number, number][]) {
    this.ranges = ranges;
  }

  getSource(destination: number): number {
    const range = this.ranges.find((range) => {
      const start = range[0];
      const end = start + range[2];
      return destination >= start && destination < end;
    });

    if (!range) return destination;

    const diff = destination - range[0];
    return range[1] + diff;
  }

  getDestination(source: number): number {
    const range = this.ranges.find((range) => {
      const start = range[1];
      const end = start + range[2];
      return source >= start && source < end;
    });

    if (!range) return source;

    const diff = source - range[1];
    return range[0] + diff;
  }
}

type Input = {
  seeds: number[];
  seedToSoilMap: RangeMap;
  soilToFertilizerMap: RangeMap;
  fertilizerToWaterMap: RangeMap;
  waterToLightMap: RangeMap;
  lightToTemperatureMap: RangeMap;
  temperatureToHumidityMap: RangeMap;
  humidityToLocationMap: RangeMap;
};
export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const parts = input.split('\n\n');

    const seedsInput = parts.shift();
    assert(seedsInput?.startsWith('seeds:'));
    const seeds = seedsInput!
      .substring('seeds: '.length)
      .split(' ')
      .map((c) => parseInt(c, 10));

    const parseRangeMap = (
      input: string | undefined,
      expectedPrefix: string,
    ): RangeMap => {
      const lines = input!.split('\n');
      assert(lines.shift() === expectedPrefix);
      const ranges = lines.map((l) => {
        return l.split(' ', 3).map((s) => parseInt(s, 10)) as [
          number,
          number,
          number,
        ];
      });
      return new RangeMap(ranges);
    };

    const seedToSoilMap = parseRangeMap(parts.shift(), 'seed-to-soil map:');
    const soilToFertilizerMap = parseRangeMap(
      parts.shift(),
      'soil-to-fertilizer map:',
    );
    const fertilizerToWaterMap = parseRangeMap(
      parts.shift(),
      'fertilizer-to-water map:',
    );
    const waterToLightMap = parseRangeMap(parts.shift(), 'water-to-light map:');
    const lightToTemperatureMap = parseRangeMap(
      parts.shift(),
      'light-to-temperature map:',
    );
    const temperatureToHumidityMap = parseRangeMap(
      parts.shift(),
      'temperature-to-humidity map:',
    );
    const humidityToLocationMap = parseRangeMap(
      parts.shift(),
      'humidity-to-location map:',
    );

    return {
      seeds,
      seedToSoilMap,
      soilToFertilizerMap,
      fertilizerToWaterMap,
      waterToLightMap,
      lightToTemperatureMap,
      temperatureToHumidityMap,
      humidityToLocationMap,
    };
  }

  async partOne(): Promise<number> {
    const seeds = this.input.seeds;
    const locations = maps.reduce((values, mapName) => {
      const map = this.input[mapName] as RangeMap;

      return values.map((source) => map.getDestination(source));
    }, seeds);

    return locations.reduce((min, c) => Math.min(min, c));
  }

  async partTwo(): Promise<number> {
    const seedRanges = createChunks(this.input.seeds, 2);

    const totalSeeds = seedRanges.map((arr) => arr[1]).reduce((a, b) => a + b);
    let seedsChecked = 0;
    const minLocationPerRange = seedRanges.map(([start, length], index) => {
      let minLoc = Number.MAX_SAFE_INTEGER;
      console.log(`checking range ${index + 1} / ${seedRanges.length}`, {
        minLoc,
      });
      for (let i = 0; i < length; i++) {
        if (i % 10_000_000 === 0) {
          const percentage = ((seedsChecked + i) / totalSeeds) * 100;
          const rangePercentage = (i / length) * 100;
          console.log(
            `[${percentage.toFixed(2).padStart(6)}% – ${rangePercentage
              .toFixed(2)
              .padStart(6)}%] checking location ${i + 1} / ${length}`,
            { minLoc },
          );
        }
        const seed = start + i;
        const location = maps.reduce((source, mapKey) => {
          const map = this.input[mapKey] as RangeMap;

          return map.getDestination(source);
        }, seed);
        minLoc = Math.min(minLoc, location);
      }
      seedsChecked += length;
      return minLoc;
    });

    return minLocationPerRange.reduce((min, val) => Math.min(min, val));
  }
}

export default Day;
