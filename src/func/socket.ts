import { GameContext } from "../types";
import { GameStates } from "../machine/GameStates";
import { ConnectionRepository } from "../server/ConnectionRepository";

export function publishContext(
  state: GameStates,
  context: GameContext,
  connections: ConnectionRepository
) {
  for (const player of context.players) {
    const connection = connections.find(player.id);
    if (connection) {
      const isCurrentPlayer = player.id === context.currentPlayer?.id;
      connection.socket.send(
        JSON.stringify({
          type: "gameUpdate",
          state: state,
          context: {
            ...context,
            availableWords: isCurrentPlayer ? context.availableWords : [],
            wordToGuess:
              isCurrentPlayer || state !== GameStates.guessing
                ? context.wordToGuess
                : null,
          },
        })
      );
    }
  }
}
