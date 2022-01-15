import { createModel } from "xstate/lib/model";
import { Line, Player } from "../types";

export const GameModel = createModel(
  {
    players: [] as Player[],
    lines: [] as Line[],
    score: [0, 0] as [number, number],
    playersLimit: 4,
    linesLimit: 15,
    guessWord: "",
    guessedWord: "",
    currentPlayer: null as Player["id"] | null,
  },
  {
    events: {
      join: (playerId: Player["id"], name: string) => ({ playerId, name }),
      joinTeam: (playerId: Player["id"], team: Player["team"]) => ({
        playerId,
        team,
      }),
      leave: (playerId: Player["id"]) => ({ playerId }),
      start: (playerId: Player["id"]) => ({ playerId }),
    },
  }
);
