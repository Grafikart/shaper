import { it, describe, expect, assert } from "vitest";
import { wordProximity } from "../../src/func/string";

describe("wordProximity", () => {
  [
    ["niche", "chien", 4],
    ["maison", "maçon", 2],
    ["ab", "ac", 1],
    ["ac", "bc", 1],
    ["abc", "axc", 1],
    ["xabxcdxxefxgx", "1ab2cd34ef5g6", 6],
    ["xabxcdxxefxgx", "abcdefg", 6],
    ["javawasneat", "scalaisgreat", 7],
    ["example", "samples", 3],
    ["forward", "drawrof", 6],
    ["sturgeon", "urgently", 6],
    ["levenshtein", "frankenstein", 6],
    ["distance", "difference", 5],
    ["distance", "eistancd", 2],
  ].forEach((test) => {
    const [a, b, expected] = test;
    it(`Distance between "${a}" and ${b} should be ${expected}`, () => {
      assert.equal(wordProximity(a, b), expected);
    });
  });
});
