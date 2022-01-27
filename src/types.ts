import { ContextFrom, EventFrom } from "xstate";
import { GameModel } from "./machine/GameModel";
import { ServerErrors } from "./constants";
import { GameStates } from "./machine/GameStates";

export type NominalType<T extends string> = { __type: T };

export type PlayerId = string & NominalType<"PlayerId">;
export type GameId = string & NominalType<"GameId">;

export type Word = {
  name: string;
  score: number;
};

export type Player = {
  id: PlayerId;
  name: string;
  ready: boolean;
  score: number;
};

export type Guess = {
  word: string;
  playerId: PlayerId;
  time: number;
};

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

export type SocketMessage =
  | {
      type: "auth";
      playerId: PlayerId;
    }
  | {
      type: "error";
      code: ServerErrors;
    }
  | {
      type: "gameUpdate";
      state: GameStates;
      context: GameContext;
    };
