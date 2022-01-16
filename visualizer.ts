// Lit la machine et copie une version du code utilisable sur https://stately.ai/viz
import { readFileSync, writeFileSync } from "fs";
import clipboard from "clipboardy";

const machine = readFileSync("./src/machine/GameMachine.ts");
const states = readFileSync("./src/machine/GameStates.ts");

const cleanedMachine = machine
  .toLocaleString()
  .replace(/import[^;]*;\n/g, "")
  .replace(/GameModel\.initialContext/g, "{}")
  .replace(/cond: (.*),/g, "cond: '$1',")
  .replace(/GameModel.assign\((.*)\)/g, "$1")
  .replace(/actions: (.*),/g, "actions: '$1',")
  .replace(/combineGuards\((.*)\)/g, "$1")
  .replace(/GameModel\./g, "");

clipboard.writeSync(
  "import { createMachine } from 'xstate';" +
    "\n\n" +
    states +
    "\n\n" +
    cleanedMachine
);
