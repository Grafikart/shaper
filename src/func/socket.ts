import { GameStates } from "../machine/GameStates";
import { ConnectionRepository } from "../server/ConnectionRepository";
import { InterpreterFrom } from "xstate";
import { GameMachine } from "../machine/GameMachine";

export function publishContext(
  { value: state, context }: InterpreterFrom<typeof GameMachine>["state"],
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
