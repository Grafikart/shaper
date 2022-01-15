import type { GameContext, GameEvent, GameGuard } from "../types";

export const canJoinGame: GameGuard<"join"> = (context: GameContext, event) => {
  return (
    context.players.length < context.playersLimit &&
    context.players.find((p) => p.id === event.playerId) === undefined
  );
};

export const canJoinTeam = (
  context: GameContext,
  event: Pick<GameEvent<"joinTeam">, "team">
) => {
  return (
    context.players.filter((p) => p.team === event.team).length <
    context.playersLimit / 2
  );
};

export const canStartGame = (
  context: GameContext,
  event: Pick<GameEvent<"joinTeam">, "playerId">
) => {
  return (
    context.players.filter((p) => p.team !== null).length ===
      context.playersLimit && context.players[0].id === event.playerId
  );
};
