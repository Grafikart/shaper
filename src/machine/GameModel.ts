import { createModel } from "xstate/lib/model";
import { Guess, Line, Player, PlayerId, Point, Word } from "../types";

export const GameModel = createModel(
  {
    players: [] as Player[],
    lines: [] as Line[],
    seed: 0, // Number used to seed the
    linesLimit: 15, // Max number of lines used for drawing
    guessDuration: 30, // Time available ot guess the word (s)
    round: 0,
    currentPlayer: null as Player | null,
    availableWords: [] as Word[], // List of word available for drawing
    wordToGuess: null as Word | null,
    guesses: [] as Guess[], // List of guess done by players
    scoreLimit: 10, // Score needed to win
    guessThrottle: 3, // Duration between guesses (s)
    roundEndAt: 0, // Round ending time (ms)
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
