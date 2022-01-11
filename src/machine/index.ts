import { createMachine } from 'xstate'
import { canDrawLine, canJoinTeam, canStartGame, lobbyNotFull } from './guards'
import { addPlayer, joinTeam, startGame } from './actions'
import type { Context, GameEvent } from '../types'

export const GameMachine = createMachine<Context, GameEvent>({
  id: 'game',
  initial: 'lobby',
  context: {
    players: [],
    lines: [],
    score: [0, 0],
    playersLimit: 4,
    linesLimit: 15,
    guessWord: '',
    guessedWord: '',
    currentPlayer: 0,
  },
  states: {
    lobby: {
      on: {
        JOIN: {
          target: 'lobby',
          cond: lobbyNotFull,
          actions: addPlayer
        },
        CHOOSE_TEAM: {
          target: 'lobby',
          // On ne peux pas rejoindre les équipes déjà remplies
          cond: canJoinTeam,
          actions: joinTeam
        },
        START: {
          target: 'selectWord',
          cond: canStartGame,
          actions: startGame
        }
      }
    },
    selectWord: {
      on: {
        SELECT: 'drawing'
      }
    },
    drawing: {
      on: {
        DRAW_LINE: {
          target: 'drawing',
          cond: canDrawLine
        },
        GUESS: {
          target: 'drawing'
        },
        TIME_OUT: {
          target: 'roundEnd'
        },
        SUCCESS: {
          target: 'roundEnd'
        }
      }
    },
    roundEnd: {
      on: {
        NEXT: 'selectWord'
      }
    }
  }
})
