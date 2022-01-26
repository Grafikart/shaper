import { createModel } from "xstate/lib/model";
import { Guess, Line, Player, PlayerId, Point, Word } from "../types";

export const GameModel = createModel(
  {
    players: [] as Player[],
    lines: [] as Line[],
    seed: 0,
    linesLimit: 15,
    guessDuration: 30,
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
      join: (playerId: PlayerId, name: string) => ({ playerId, name }),
      ready: (playerId: PlayerId) => ({
        playerId,
      }),
      leave: (playerId: PlayerId) => ({ playerId }),
      start: (playerId: PlayerId) => ({ playerId }),
      chooseWord: (playerId: PlayerId, word: string) => ({
        playerId,
        word,
      }),
      drawLine: (playerId: PlayerId, start: Point, end: Point) => ({
        start,
        end,
        playerId,
      }),
      guessWord: (playerId: PlayerId, word: string) => ({ word, playerId }),
      retry: (playerId: PlayerId) => ({ playerId }),
      ban: (playerId: PlayerId, banId: PlayerId) => ({
        playerId,
        banId,
      }),
    },
  }
);
