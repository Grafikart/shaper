import { createModel } from "xstate/lib/model";
import { Guess, Line, Player, Point, Word } from "../types";

export const GameModel = createModel(
  {
    players: [] as Player[],
    lines: [] as Line[],
    seed: 0,
    linesLimit: 15,
    round: 0,
    currentPlayer: null as Player | null,
    availableWords: [] as Word[],
    wordToGuess: null as Word | null,
    guesses: [] as Guess[],
    scoreLimit: 10,
    roundEndAt: 0,
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
      retry: (playerId: Player["id"]) => ({ playerId }),
      ban: (playerId: Player["id"], banId: Player["id"]) => ({
        playerId,
        banId,
      }),
    },
  }
);
