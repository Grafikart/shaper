import { GameContext } from "../types";
import { GameStates } from "../machine/states";
import { SocketStream } from "fastify-websocket";

export function publishContext(
  state: GameStates,
  context: GameContext,
  connections: Map<string, SocketStream>
) {
  for (const player of context.players) {
    const connection = connections.get(player.id);
    if (!connection) {
      return;
    }
    connection.socket.send(
      JSON.stringify({
        type: "gameUpdate",
        state: state,
        context: context,
      })
    );
  }
}
