import { BaseDay } from '../day';

type Input = {
  workflows: Record<string, Workflow>;
  parts: Part[];
};

type Workflow = {
  name: string;
  rules: Rule[];
  noMatch: string;
};
type Rule = {
  prop: PartProp;
  condition: '>' | '<';
  value: number;
  workflow: string;
};

type Part = {
  x: number;
  m: number;
  a: number;
  s: number;
};
type PartProp = keyof Part;

const parsePart = (input: string): Part => {
  const { x, m, a, s } = input.match(
    /{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}/,
  )!.groups!;

  return {
    x: parseInt(x),
    m: parseInt(m),
    a: parseInt(a),
    s: parseInt(s),
  };
};

const parseRule = (input: string): Rule => {
  const { prop, condition, value, workflow } = input.match(
    /(?<prop>[xmas])(?<condition>[<>])(?<value>\d+):(?<workflow>.+)/,
  )!.groups!;

  return {
    prop: prop as PartProp,
    condition: condition as '>' | '<',
    value: parseInt(value),
    workflow,
  };
};
const parseWorkflow = (input: string): Workflow => {
  const { name, rest } = input.match(/(?<name>.+){(?<rest>.+)}/)!.groups!;

  const rulesInput = rest.split(',');
  const noMatch = rulesInput.pop()!;
  const rules = rulesInput.map((l) => parseRule(l));
  return {
    name,
    rules,
    noMatch,
  };
};

const processPart = (part: Part, workflows: Input['workflows']): 'R' | 'A' => {
  let current = 'in';

  while (!['R', 'A'].includes(current)) {
    const workflow = workflows[current];
    const next = workflow.rules.find(({ condition, prop, value }) => {
      const partValue = part[prop];

      if (condition === '<') {
        return partValue < value;
      } else {
        return partValue > value;
      }
    });
    if (next) {
      current = next.workflow;
    } else {
      current = workflow.noMatch;
    }
  }

  return current as 'R' | 'A';
};

export class Day extends BaseDay<Input, number, number> {
  parse(input: string): Input {
    const [workflowInput, partsInput] = input.trim().split('\n\n');

    const workflows = workflowInput
      .split('\n')
      .map((line) => parseWorkflow(line))
      .reduce<Record<string, Workflow>>((map, workflow) => {
        map[workflow.name] = workflow;
        return map;
      }, {});

    const parts = partsInput.split('\n').map((l) => parsePart(l));

    return { workflows, parts };
  }

  async partOne(): Promise<number> {
    const processedParts = this.input.parts.reduce<Record<'A' | 'R', Part[]>>(
      (map, part) => {
        const result = processPart(part, this.input.workflows);
        map[result].push(part);
        return map;
      },
      { A: [], R: [] },
    );

    const accepted = processedParts.A;

    return accepted
      .map(({ x, m, a, s }) => x + m + a + s)
      .reduce((a, b) => a + b);
  }

  async partTwo(): Promise<number> {
    const workflows = this.input.workflows;

    const acceptedPartCount = (
      name: string,
      ranges: Record<PartProp, [number, number]>,
    ): number => {
      if (name === 'R') {
        return 0;
      }
      if (name === 'A') {
        const rangeCounts = Object.values(ranges).map(
          ([min, max]) => max - min + 1,
        );
        return rangeCounts.reduce((a, b) => a * b);
      }

      const workflow = workflows[name];

      const ruleCounts = workflow.rules.map((rule) => {
        const [min, max] = ranges[rule.prop];
        if (rule.condition === '<') {
          // istanbul ignore next
          if (min >= rule.value) {
            // already not possible
            return 0;
          }

          // istanbul ignore next
          if (max < rule.value) {
            //entire range goes here:
            return acceptedPartCount(rule.workflow, { ...ranges });
          }

          //partial range satisfies:
          ranges[rule.prop] = [rule.value, max];
          return acceptedPartCount(rule.workflow, {
            ...ranges,
            [rule.prop]: [min, rule.value - 1],
          });
        } else {
          // '>'
          // istanbul ignore next
          if (max <= rule.value) {
            // already not possible
            return 0;
          }

          // istanbul ignore next
          if (min > rule.value) {
            //entire range goes here:
            return acceptedPartCount(rule.workflow, { ...ranges });
          }

          //partial range satisfies:
          ranges[rule.prop] = [min, rule.value];
          return acceptedPartCount(rule.workflow, {
            ...ranges,
            [rule.prop]: [rule.value + 1, max],
          });
        }
      });

      //add what's left:
      ruleCounts.push(acceptedPartCount(workflow.noMatch, { ...ranges }));

      return ruleCounts.reduce((a, b) => a + b);
    };

    const MAX = 4000;
    const ranges: Record<PartProp, [number, number]> = {
      x: [1, MAX],
      m: [1, MAX],
      a: [1, MAX],
      s: [1, MAX],
    };

    return acceptedPartCount('in', ranges);
  }
}

export default Day;
