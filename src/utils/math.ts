export function leastCommonMultiple(numbers: number[]) {
  const gcd = (a: number, b: number): number => (a ? gcd(b % a, a) : b);
  const lcm = (a: number, b: number) => (a * b) / gcd(a, b);

  return numbers.reduce(lcm);
}
