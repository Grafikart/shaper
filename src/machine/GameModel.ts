import { createModel } from "xstate/lib/model";
import { Line, Player, Point, Word } from "../types";

export const GameModel = createModel(
  {
    players: [] as Player[],
    lines: [] as Line[],
    score: [0, 0] as number[],
    linesLimit: 15,
    round: 0,
    currentPlayer: null as Player | null,
    availableWords: [] as Word[],
    wordToGuess: null as Word | null,
  },
  {
    events: {
      join: (playerId: Player["id"], name: string) => ({ playerId, name }),
      ready: (playerId: Player["id"]) => ({
        playerId,
      }),
      leave: (playerId: Player["id"]) => ({ playerId }),
      start: (playerId: Player["id"]) => ({ playerId }),
      chooseWord: (playerId: Player["id"], word: string) => ({
        playerId,
        word,
      }),
      drawLine: (playerId: Player["id"], start: Point, end: Point) => ({
        start,
        end,
        playerId,
      }),
      guessWord: (playerId: Player["id"], word: string) => ({ word, playerId }),
      continue: () => ({}),
      retry: () => ({}),
    },
  }
);
