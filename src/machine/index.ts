import { GameModel } from "./model";
import { GameStates } from "./states";
import { canJoinGame, canJoinTeam, canStartGame } from "./guards";
import { addPlayer, joinTeam, leave } from "./actions";

export const GameMachine = GameModel.createMachine({
  id: "game",
  initial: GameStates.lobby,
  context: GameModel.initialContext,
  states: {
    lobby: {
      on: {
        join: {
          target: "lobby",
          cond: canJoinGame,
          actions: GameModel.assign(addPlayer),
        },
        joinTeam: {
          target: "lobby",
          cond: canJoinTeam,
          actions: GameModel.assign(joinTeam),
        },
        leave: {
          target: "lobby",
          actions: GameModel.assign(leave),
        },
        start: {
          target: "chooseWord",
          cond: canStartGame,
        },
      },
    },
    chooseWord: {},
  },
});

/*
export const GameMachine = createMachine<Context, GameEvent>({
  id: "game",
  initial: "lobby",
  context: GameModel.initialContext,
  states: {
    lobby: {
      on: {
        join: {
          target: "lobby",
          cond: lobbyNotFull,
          actions: addPlayer,
        },
        LEAVE_GAME: {
          target: "lobby",
          actions: removePlayer,
        },
        CHOOSE_TEAM: {
          target: "lobby",
          // On ne peux pas rejoindre les équipes déjà remplies
          cond: canJoinTeam,
          actions: joinTeam,
        },
        START: {
          target: "selectWord",
          cond: canStartGame,
          actions: startGame,
        },
      },
    },
    selectWord: {
      on: {
        SELECT: "drawing",
      },
    },
    drawing: {
      on: {
        DRAW_LINE: {
          target: "drawing",
          cond: canDrawLine,
        },
        GUESS: {
          target: "drawing",
        },
        TIME_OUT: {
          target: "roundEnd",
        },
        SUCCESS: {
          target: "roundEnd",
        },
      },
    },
    roundEnd: {
      on: {
        NEXT: "selectWord",
      },
    },
  },
});
*/
