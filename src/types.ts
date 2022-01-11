export type Team = {
  players: [number, number],
  score: number
}

export type Player = {
  team: number | null,
  id: number
}

export type Line = {
  start: Point,
  end: Point
}

export type Point = {x: number, y: number}

export type Context = {
  players: Player[],
  lines: Line[],
  score: [number, number]
  playersLimit: number
  linesLimit: number,
  guessWord: string,
  guessedWord: string,
  currentPlayer: Player['id']
}

export type GameEvent =
  | { type: 'CHOOSE_TEAM'; team: number, playerId: number }
  | {type: 'JOIN', playerId: number}
  | {type: 'START'}
  | {type: 'SELECT'}
  | {type: 'DRAW_LINE'}
  | {type: 'GUESS'}
  | {type: 'TIME_OUT'}
  | {type: 'SUCCESS'}
  | {type: 'NEXT'}

export type GameEventForType<T extends GameEvent['type']> = GameEvent & {type: T}
