/**
 * Find how close 2 words are (uses levenshtein distance)
 */
export function wordProximity(str1: string, str2: string) {
  const a = cleanStr(str1);
  const b = cleanStr(str2);

  const d = [];
  let i,
    j = 0;
  for (i = 0; i <= a.length; i++) {
    d[i] = [i];
  }

  for (j = 0; j <= b.length; j++) {
    d[0][j] = j;
  }

  for (i = 1; i <= a.length; i++) {
    for (j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(
        d[i - 1][j] + 1,
        d[i][j - 1] + 1,
        d[i - 1][j - 1] + cost
      );
    }
  }

  return d[a.length][b.length];
}

function cleanStr(str: string) {
  return str
    .toLowerCase()
    .replace(/é/g, "e")
    .replace(/è/g, "e")
    .replace(/à/g, "a")
    .replace(/ù/g, "u")
    .replace(/ /g, "")
    .replace(/-/g, "");
}
