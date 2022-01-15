import Fastify from "fastify";
import FastifyWS, { SocketStream } from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { interpret } from "xstate";
import { GameMachine } from "../machine";
import { GameModel } from "../machine/model";
import { v4 as uuid } from "uuid";
import Randanimal from "randanimal";
import { publishContext } from "../func/socket";
import { GameStates } from "../machine/states";
import { GameEvent } from "../types";

const connections = new Map<string, SocketStream>();

const gameService = interpret(GameMachine)
  .onTransition((state) => {
    publishContext(state.value as GameStates, state.context, connections);
  })
  .start();

const fastify = Fastify({ logger: true });
fastify.register(FastifyWS);
fastify.register(FastifyStatic, {
  root: path.resolve("./public"),
});

// Declare a route
fastify.get("/ws", { websocket: true }, (connection, req) => {
  const userId = uuid();
  connections.set(userId, connection);
  gameService.send(GameModel.events.join(userId, Randanimal.randanimalSync()));
  connection.socket.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage.toLocaleString()) as GameEvent;
    gameService.send({ ...message, playerId: userId });
  });
  connection.socket.on("close", (message) => {
    connections.delete(userId);
    gameService.send(GameModel.events.leave(userId));
  });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(8000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
