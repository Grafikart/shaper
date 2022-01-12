import { SocketStream } from "fastify-websocket";
import { GameMachine } from "./machine";
import { GameController } from "./server/GameController";

export type Team = {
  players: [number, number];
  score: number;
};

export type Player = {
  team: number | null;
  id: string;
  connection: SocketStream;
};

export type Line = {
  start: Point;
  end: Point;
};

export type Point = { x: number; y: number };

export type Context = {
  players: Player[];
  lines: Line[];
  score: [number, number];
  playersLimit: number;
  linesLimit: number;
  guessWord: string;
  guessedWord: string;
  currentPlayer: Player["id"];
};

export type GameEvent =
  | { type: "CHOOSE_TEAM"; team: number; connection: SocketStream }
  | { type: "JOIN"; connection: SocketStream }
  | { type: "LEAVE_GAME"; connection: SocketStream }
  | { type: "START" }
  | { type: "SELECT" }
  | { type: "DRAW_LINE" }
  | { type: "GUESS" }
  | { type: "TIME_OUT" }
  | { type: "SUCCESS" }
  | { type: "NEXT" };

export type GameEventForType<T extends GameEvent["type"]> = GameEvent & {
  type: T;
};

export type GameMachineStates = string;

export type AppMessage = ValueOf<{
  [key in keyof GameController]: {
    type: key;
    data: Parameters<GameController[key]>[0];
  };
}>;

type ValueOf<T> = T[keyof T];
