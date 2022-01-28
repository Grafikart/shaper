import { PlayerId, PlayerSession } from "../types";

export class PlayerSessionPersister {
  static savePlayer(player: PlayerSession): PlayerSession {
    localStorage.setItem("playerId", player.playerId);
    localStorage.setItem("signature", player.signature);
    localStorage.setItem("name", player.name);
    return player;
  }

  static getPlayer(): PlayerSession | null {
    const playerId = localStorage.getItem("playerId") as PlayerId | null;
    const name = localStorage.getItem("name") as string | null;
    const signature = localStorage.getItem("signature") as string | null;
    if (!signature || !name || !playerId) {
      return null;
    }
    return {
      playerId,
      name,
      signature,
    };
  }

  static clear(): void {
    localStorage.clear();
  }
}
