import { ContextFrom, EventFrom } from "xstate";
import { GameModel } from "./machine/model";

export type Player = {
  team: number | null;
  id: string;
  name: string;
};

export type Line = {
  start: Point;
  end: Point;
};

export type Point = { x: number; y: number };

export type GameContext = ContextFrom<typeof GameModel>;
export type GameEvent = EventFrom<typeof GameModel>;
export type GameAction<T extends GameEvent["type"]> = (
  context: GameContext,
  event: GameEvent & { type: T }
) => Partial<GameContext>;

export type GameMachineStates = string;

export type GameGuard<T extends GameEvent["type"] = GameEvent["type"]> = (
  context: GameContext,
  event: GameEvent & { type: T }
) => boolean;

type ValueOf<T> = T[keyof T];
