import type { GameAction, GameContext } from "../types";

export const addPlayer: GameAction<"join"> = (context, event) => ({
  players: [
    ...context.players,
    { id: event.playerId, name: event.name, ready: false },
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
    currentPlayer: readyPlayers[0]!,
    availableWords: [
      {
        name: "Balançoire",
        score: 1,
      },
      {
        name: "Renard",
        score: 2,
      },
    ],
  };
};

export const chooseWord: GameAction<"chooseWord"> = (context, event) => ({
  availableWords: [],
  wordToGuess: context.availableWords.find((w) => w.name === event.word),
});

export const chooseWordRandomly = (context: GameContext) => ({
  availableWords: [],
  wordToGuess: context.availableWords.find((w) => w.score === 1),
});

export const drawLine: GameAction<"drawLine"> = (context, event) => ({
  lines: [...context.lines, { start: event.start, end: event.end }],
});
