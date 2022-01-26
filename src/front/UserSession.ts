import { PlayerId } from "../types";

export class UserSession {
  setId(id: PlayerId): void {
    localStorage.setItem("playerId", id);
  }

  getId() {
    return localStorage.getItem("playerId") as PlayerId | null;
  }

  clear(): void {
    localStorage.clear();
  }
}
