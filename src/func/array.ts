/**
 * Mélange un tableau de manière consistante
 * https://stackoverflow.com/questions/16801687/javascript-random-ordering-with-seed
 */
export function shuffle<T>(originalArray: T[], seed: number) {
  const array = [...originalArray];
  let m = array.length;

  while (m) {
    const i = Math.floor(random(seed) * m--);

    const t = array[m];
    array[m] = array[i];
    array[i] = t;
    ++seed;
  }

  return array;
}

function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}
