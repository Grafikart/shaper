import type { GameAction, GameContext } from "../types";
import { words } from "../server/config";
import { shuffle } from "../func/array";

export const addPlayer: GameAction<"join"> = (context, event) => ({
  players: [
    ...context.players,
    { id: event.playerId, name: event.name, ready: false, score: 0 },
  ],
});

export const ready: GameAction<"ready"> = (context, event) => ({
  players: context.players.map((p) =>
    p.id === event.playerId ? { ...p, ready: true } : p
  ),
});

export const leave: GameAction<"leave"> = (context, event) => ({
  players: context.players.filter((p) => p.id !== event.playerId),
});

export const startGame: GameAction<"start"> = (context) => {
  const readyPlayers = context.players.filter((p) => p.ready);
  return {
    players: readyPlayers,
    round: 0,
    seed: Math.random(),
  };
};

export const chooseWord: GameAction<"chooseWord"> = (context, event) => ({
  availableWords: [],
  roundEndAt: Date.now() + context.guessDuration * 1000,
  wordToGuess: context.availableWords.find((w) => w.name === event.word),
});

export const chooseWordRandomly = (context: GameContext) => ({
  availableWords: [],
  roundEndAt: Date.now() + context.guessDuration * 1000,
  wordToGuess: context.availableWords.find((w) => w.score === 1),
});

export const drawLine: GameAction<"drawLine"> = (context, event) => ({
  lines: [...context.lines, { start: event.start, end: event.end }],
});

export const guessWord: GameAction<"guessWord"> = (context, event) => ({
  guesses: [{ ...event, time: Date.now() }, ...context.guesses],
});

export const addScore: GameAction<"guessWord"> = (context, event) => {
  return {
    players: context.players.map((player) => {
      if (player.id === context.currentPlayer?.id) {
        return { ...player, score: player.score + context.wordToGuess!.score };
      } else if (player.id === event.playerId) {
        return { ...player, score: player.score + 1 };
      }
      return player;
    }),
  };
};

export const startRound = (context: GameContext) => {
  const wordsFor1Points = shuffle(words["1"], context.seed);
  const wordsFor2Points = shuffle(words["2"], context.seed);
  return {
    lines: [],
    guesses: [],
    currentPlayer: context.players[context.round % context.players.length]!,
    round: context.round + 1,
    availableWords: [
      {
        name: wordsFor1Points[context.round % words["1"].length],
        score: 1,
      },
      {
        name: wordsFor2Points[context.round % words["2"].length],
        score: 2,
      },
    ],
  };
};

export const resetScores = (context: GameContext) => ({
  players: context.players.map((p) => ({ ...p, score: 0 })),
});

export const ban: GameAction<"ban"> = (context, event) => ({
  players: context.players.filter((p) => p.id !== event.banId),
});
