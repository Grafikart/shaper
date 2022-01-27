export function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function round(n: number, precision: number) {
  return Math.round(n * Math.pow(10, precision)) / Math.pow(10, precision);
}

export function time<T>(n: number, cb: (k: number) => T): T[] {
  return Array(n)
    .fill(1)
    .map((v, k) => cb(k));
}
