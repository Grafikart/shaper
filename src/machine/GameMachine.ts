import { GameModel } from "./GameModel";
import { GameStates } from "./GameStates";
import {
  bannedPlayerIsPlaying,
  canBan,
  canChooseWord,
  canDrawLine,
  canJoinGame,
  canReady,
  canStartGame,
  combineGuards,
  hasWinner,
  isCurrentPlayer,
  isRightWord,
  reverseGuard,
} from "./guards";
import {
  addPlayer,
  addScore,
  ban,
  chooseWord,
  chooseWordRandomly,
  drawLine,
  guessWord,
  leave,
  ready,
  resetScores,
  startGame,
  startRound,
} from "./actions";
import { Action } from "xstate";
import { GameContext } from "../types";

export const GameMachine = GameModel.createMachine({
  id: "game",
  initial: GameStates.lobby,
  context: GameModel.initialContext,
  states: {
    [GameStates.lobby]: {
      on: {
        join: {
          cond: canJoinGame,
          actions: GameModel.assign(addPlayer),
        },
        ready: {
          cond: canReady,
          actions: GameModel.assign(ready),
        },
        leave: {
          actions: GameModel.assign(leave),
        },
        start: {
          target: GameStates.chooseWord,
          cond: canStartGame,
          actions: [GameModel.assign(startRound), GameModel.assign(startGame)],
        },
      },
    },
    [GameStates.chooseWord]: {
      entry: GameModel.assign(startRound),
      on: {
        chooseWord: {
          target: GameStates.guessing,
          cond: combineGuards(isCurrentPlayer, canChooseWord),
          actions: GameModel.assign(chooseWord),
        },
      },
      after: {
        10000: {
          target: GameStates.guessing,
          actions: GameModel.assign(chooseWordRandomly) as Action<
            GameContext,
            any
          >,
        },
      },
    },
    [GameStates.guessing]: {
      on: {
        drawLine: {
          cond: combineGuards(isCurrentPlayer, canDrawLine),
          actions: GameModel.assign(drawLine),
        },
        guessWord: [
          {
            cond: combineGuards(
              reverseGuard(isCurrentPlayer),
              reverseGuard(isRightWord)
            ),
            actions: GameModel.assign(guessWord),
          },
          {
            target: GameStates.success,
            cond: combineGuards(reverseGuard(isCurrentPlayer), isRightWord),
            actions: [GameModel.assign(guessWord), GameModel.assign(addScore)],
          },
        ],
        ban: [
          {
            cond: combineGuards(bannedPlayerIsPlaying, canBan),
            target: GameStates.chooseWord,
            actions: GameModel.assign(ban),
          },
          {
            cond: combineGuards(canBan),
            actions: GameModel.assign(ban),
          },
        ],
      },
      after: {
        30000: {
          target: GameStates.failure,
        },
      },
    },
    [GameStates.success]: {
      after: {
        5000: [
          {
            target: GameStates.chooseWord,
            cond: reverseGuard(hasWinner),
          },
          {
            target: GameStates.end,
            cond: hasWinner,
          },
        ],
      },
    },
    [GameStates.failure]: {
      after: {
        5000: [
          {
            target: GameStates.chooseWord,
          },
        ],
      },
    },
    [GameStates.end]: {
      on: {
        retry: {
          target: GameStates.chooseWord,
          actions: [GameModel.assign(resetScores)],
          cond: canStartGame,
        },
      },
    },
  },
});
