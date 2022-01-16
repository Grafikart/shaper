import { GameModel } from "./GameModel";
import { GameStates } from "./GameStates";
import {
  canChooseWord,
  canDrawLine,
  canJoinGame,
  canReady,
  canStartGame,
  combineGuards,
  isCurrentPlayer,
} from "./guards";
import {
  addPlayer,
  chooseWord,
  chooseWordRandomly,
  drawLine,
  leave,
  ready,
  startGame,
} from "./actions";

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
          actions: GameModel.assign(startGame),
        },
      },
    },
    [GameStates.chooseWord]: {
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
          actions: GameModel.assign(chooseWordRandomly),
        },
      },
    },
    [GameStates.guessing]: {
      on: {
        drawLine: {
          target: GameStates.guessing,
          cond: combineGuards(isCurrentPlayer, canDrawLine),
          actions: GameModel.assign(drawLine),
        },
      },
    },
    [GameStates.success]: {
      on: {
        continue: {
          target: GameStates.guessing,
        },
      },
    },
    [GameStates.failure]: {
      on: {
        continue: {
          target: GameStates.guessing,
        },
      },
    },
    [GameStates.end]: {
      on: {
        retry: {
          target: GameStates.chooseWord,
        },
      },
    },
  },
});
