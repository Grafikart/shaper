import { ContextFrom, EventFrom } from "xstate";
import { GameModel } from "./machine/GameModel";

export type Word = {
  name: string;
  score: number;
};

export type Player = {
  id: string;
  name: string;
  ready: boolean;
  score: number;
};

export type Guess = {
  word: string,
  playerId: Player['id'],
}

export type Line = {
  start: Point;
  end: Point;
};

export type Point = { x: number; y: number };

export type GameContext = ContextFrom<typeof GameModel>;
export type GameEvent<
  T extends EventFrom<typeof GameModel>["type"] = EventFrom<
    typeof GameModel
  >["type"]
> = EventFrom<typeof GameModel> & { type: T };
export type GameAction<T extends GameEvent["type"]> = (
  context: GameContext,
  event: GameEvent & { type: T }
) => Partial<GameContext>;

export type GameGuard<T extends GameEvent["type"] = GameEvent["type"]> = (
  context: GameContext,
  event: GameEvent & { type: T }
) => boolean;

export type GameEventEmitter = (event: GameEvent) => void;

type ValueOf<T> = T[keyof T];
