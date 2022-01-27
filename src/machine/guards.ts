import type { GameAction, GameContext, GameEvent, GameGuard } from "../types";
import { wordProximity } from "../func/string";

export const isCurrentPlayer = (
  context: GameContext,
  event: { playerId: string }
) => {
  return context.currentPlayer?.id === event.playerId;
};

const isHost = (context: GameContext, playerId: string) => {
  return context.players[0].id === playerId;
};

export const canJoinGame: GameGuard<"join"> = (context: GameContext, event) => {
  return context.players.find((p) => p.id === event.playerId) === undefined;
};

export const canReady: GameGuard<"ready"> = (context, event) => {
  return context.players.find((p) => p.id === event.playerId)?.ready === false;
};

export const canStartGame = (
  context: GameContext,
  event: { playerId: string }
) => {
  return (
    context.players.filter((p) => p.ready).length >= 2 &&
    isHost(context, event.playerId)
  );
};

export const canChooseWord: GameGuard<"chooseWord"> = (context, event) => {
  return (
    context.availableWords.find((word) => word.name === event.word) !==
    undefined
  );
};

export const canGuessWord: GameGuard<"guessWord"> = (context, event) => {
  return context.guesses.find((w) => w.word === event.word) === undefined;
};

export const canDrawLine = (context: GameContext) => {
  return context.lines.length < context.linesLimit;
};

export const isRightWord = (context: GameContext, event: { word: string }) => {
  return wordProximity(context.wordToGuess?.name || "", event.word) <= 2;
};

export const hasWinner = (context: GameContext) => {
  return (
    context.players.find((p) => p.score >= context.scoreLimit) !== undefined
  );
};

export const canBan: GameGuard<"ban"> = (context, event) => {
  return (
    isHost(context, event.playerId) &&
    !isCurrentPlayer(context, event) &&
    event.playerId !== event.banId
  );
};

export const bannedPlayerIsPlaying = (
  context: GameContext,
  event: { banId: string }
) => {
  return context.currentPlayer?.id === event.banId;
};

/**
 * Utilities
 */
export function combineGuards<E extends GameEvent["type"]>(
  ...conds: GameGuard<E>[]
): GameGuard<E> {
  return (context, event) => {
    for (const cond of conds) {
      if (!cond(context, event)) {
        return false;
      }
    }
    return true;
  };
}

export function reverseGuard<E extends Function>(fn: E) {
  return (...args: unknown[]) => !fn(...args);
}
