import type { Context, GameEventForType } from '../types'

export const lobbyNotFull = (context: Context) => {
  return context.players.length < context.playersLimit;
};

export const canDrawLine = (context: Context) => {
  return context.lines.length < context.linesLimit;
};

export const canStartGame = (context: Context) => {
  if (context.players.length < context.playersLimit) {
    return false;
  }
  return !context.players.find(p => p.team === null);
}

export const canJoinTeam = (context: Context, event: GameEventForType<'CHOOSE_TEAM'>) => {
  return context.players.filter(p => p.team === event.team).length < context.playersLimit / 2
}
