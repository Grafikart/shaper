import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { interpret } from "xstate";
import { GameMachine } from "../machine";
import { publishContext } from "../func/socket";
import { AppMessage } from "../types";
import { GameController } from "./GameController";

// Machine instance with internal state
const gameService = interpret(GameMachine)
  .onTransition((state) => {
    publishContext(state.value, state.context);
  })
  .start();

/*

gameService.send('JOIN', {playerId: 3})
gameService.send('CHOOSE_TEAM', {team: 0, playerId: 3})
gameService.send('JOIN', {playerId: 4})
gameService.send('CHOOSE_TEAM', {team: 1, playerId: 4})
gameService.send('JOIN', {playerId: 5})
gameService.send('CHOOSE_TEAM', {team: 1, playerId: 5})
gameService.send('JOIN', {playerId: 6})
gameService.send('CHOOSE_TEAM', {team: 0, playerId: 6})
gameService.send('START')
*/

const fastify = Fastify({ logger: true });
fastify.register(FastifyWS);
fastify.register(FastifyStatic, {
  root: path.resolve("./public"),
});

// Declare a route
fastify.get("/ws", { websocket: true }, (connection, req) => {
  const controller = new GameController(gameService, connection);
  gameService.send("JOIN", { connection: connection });
  connection.socket.on("message", (rawMessage) => {
    const message = JSON.parse(rawMessage.toLocaleString()) as AppMessage;
    controller[message.type](message.data);
  });
  connection.socket.on("close", (message) => {
    gameService.send("LEAVE_GAME", { connection: connection });
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
