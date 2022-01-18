import Fastify from "fastify";
import FastifyWS, { SocketStream } from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { interpret } from "xstate";
import { GameMachine } from "../machine/GameMachine";
import { GameModel } from "../machine/GameModel";
import { v4 as uuid } from "uuid";
import Randanimal from "randanimal";
import { publishContext } from "../func/socket";
import { GameStates } from "../machine/GameStates";
import { GameEvent } from "../types";
import { MachinePersister } from "../machine/MachinePersister";

const connections = new Map<string, SocketStream>();

const previousMachineState = MachinePersister.retrieve();
// On ne veut pas publier les choses tant que le service n'a pas reçu son contexte
const serviceReady = { current: false };

const gameService = interpret(
  GameMachine.withContext({
    ...GameModel.initialContext,
    ...previousMachineState.context,
  })
)
  .onTransition((state) => {
    if (!serviceReady.current) {
      return;
    }
    publishContext(state.value as GameStates, state.context, connections);
    MachinePersister.persist({
      state: state.value as GameStates,
      context: state.context,
    });
  })
  .start(previousMachineState.state);

const fastify = Fastify({ logger: false });
fastify.register(FastifyWS);
fastify.register(FastifyStatic, {
  root: path.resolve("./public"),
});
serviceReady.current = true;

// Declare a route
fastify.get("/ws", { websocket: true }, (connection, req) => {
  const query = req.query as Record<string, string>;
  const userId = query.userId ?? uuid();
  connections.set(userId, connection);
  gameService.send(GameModel.events.join(userId, Randanimal.randanimalSync()));
  connection.socket.send(
    JSON.stringify({
      type: "auth",
      userId: userId,
    })
  );
  publishContext(
    gameService.state.value as GameStates,
    gameService.state.context,
    connections
  );
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
    await fastify.listen(process.env.PORT || 8000, "0.0.0.0");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
