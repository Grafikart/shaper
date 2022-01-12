import { Context } from "../types";
import { StateValue } from "xstate";

export function publishContext(state: StateValue, context: Context) {
  for (const player of context.players) {
    player.connection.socket.send(
      JSON.stringify({
        state: state,
        context: {
          players: context.players.map((p) => ({ ...p, connection: null })),
          lines: context.lines,
          score: context.score,
          playersLimit: context.playersLimit,
          linesLimit: context.linesLimit,
          guessedWord: context.guessedWord,
          currentPlayer: context.currentPlayer,
        },
      })
    );
  }
}
