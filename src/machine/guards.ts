import type { GameContext, GameGuard } from "../types";

export const lobbyNotFull = (context: GameContext) => {
  return context.players.length < context.playersLimit;
};

export const canJoinTeam: GameGuard<"joinTeam"> = (context, event) => {
  return (
    context.players.filter((p) => p.team === event.team).length <
    context.playersLimit / 2
  );
};

/*
export const canDrawLine = (context: GameContext) => {
  return context.lines.length < context.linesLimit;
};

export const canStartGame = (context: GameContext) => {
  if (context.players.length < context.playersLimit) {
    return false;
  }
  return !context.players.find((p) => p.team === null);
};
 */
