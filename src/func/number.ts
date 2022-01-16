export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function round(n: number, precision: number) {
  return Math.round(n * Math.pow(10, precision)) / Math.pow(10, precision);
}
