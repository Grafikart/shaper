import type { GameAction } from "../types";

export const addPlayer: GameAction<"join"> = (context, event) => ({
  players: [
    ...context.players,
    { id: event.playerId, name: event.name, team: null },
  ],
});

export const joinTeam: GameAction<"joinTeam"> = (context, event) => ({
  players: context.players.map((p) =>
    p.id === event.playerId ? { ...p, team: event.team } : p
  ),
});

export const leave: GameAction<"leave"> = (context, event) => ({
  players: context.players.filter((p) => p.id !== event.playerId),
});

/*
export const removePlayer = assign(
  (context: Context, event: GameEventForType<"LEAVE_GAME">) => ({
    players: context.players.filter((p) => p.connection !== event.connection),
  })
);

export const joinTeam = assign(
  (context: Context, event: GameEventForType<"CHOOSE_TEAM">) => ({
    players: context.players.map((p) =>
      p.connection === event.connection ? { ...p, team: event.team } : p
    ),
  })
);

export const startGame = assign(
  (context: Context, event: GameEventForType<any>) => ({
    // currentPlayer: randomBetween(0, context.players.length - 1),
  })
);
*/
