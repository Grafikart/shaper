import { assign } from 'xstate'
import { randomBetween } from '../func/number'
import type { Context, GameEventForType } from '../types'

export const addPlayer =  assign<Context, GameEventForType<'JOIN'>>({
  players: (context, event) => [...context.players, {team: null, id: event.playerId}],
})

export const joinTeam = assign((context: Context, event: GameEventForType<'CHOOSE_TEAM'>) => ({
  players: context.players.map(p => p.id === event.playerId ? {...p, team: event.team} : p)
}))

export const startGame = assign((context: Context, event: GameEventForType<any>) => ({
  currentPlayer: randomBetween(0, context.players.length - 1),
}))
