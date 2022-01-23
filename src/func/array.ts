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

export function keyBy<T extends Record<string, unknown>>(
  items: T[],
  key: keyof T
): Record<string, T> {
  return items.reduce((acc, item) => {
    const value = item[key];
    if (!(typeof value === "string")) {
      throw new Error(
        `${key} ne peut être utilisé comme clef, la valeur n'est pas une chaine)`
      );
    }
    return {
      ...acc,
      [value]: item,
    };
  }, {});
}
