import { SocketStream } from "fastify-websocket";
import { Player, PlayerId } from "../types";

export class ConnectionRepository {
  constructor(private connections = new Map<string, SocketStream>()) {}

  persist(id: PlayerId, connection: SocketStream) {
    this.connections.set(id, connection);
  }

  update(id: PlayerId, connection: SocketStream) {
    this.connections.set(id, connection);
  }

  remove(id: PlayerId) {
    this.connections.delete(id);
  }

  find(id: PlayerId) {
    return this.connections.get(id);
  }

  has(id: PlayerId) {
    return this.connections.has(id);
  }
}
