import { GameId, PlayerId } from "../types";
import { v4 as randomUUID } from "uuid";

export function generateGameId(): GameId {
  return randomUUID() as GameId;
}

export function generatePlayerId(): PlayerId {
  return randomUUID() as PlayerId;
}
