import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { GameModel } from "../machine/GameModel";
import { v4 as uuid } from "uuid";
import Randanimal from "randanimal";
import { publishContext } from "../func/socket";
import { GameStates } from "../machine/GameStates";
import { GameEvent, GameId, PlayerId } from "../types";
import { ConnectionRepository } from "./ConnectionRepository";
import { GamesRepository } from "./GamesRepository";
import { ServerErrors } from "../constants";

const connections = new ConnectionRepository();
const games = new GamesRepository(connections);

const fastify = Fastify({ logger: false });
fastify.register(FastifyWS);
fastify.register(FastifyStatic, {
  root: path.resolve("./public"),
});

// Declare a route
fastify.get("/ws", { websocket: true }, (connection, req) => {
  const query = req.query as Record<string, string>;
  try {
    const playerId = (query.playerId ? query.playerId : uuid()) as PlayerId;
    const username = query.username ?? Randanimal.randanimalSync();
    const gameId = query.gameId as GameId;

    // Connection is not allowed if we have not gameId
    if (!gameId) {
      connection.end();
      return;
    }

    // Game not found
    const game = games.find(gameId);
    if (!game) {
      connection.socket.send(
        JSON.stringify({ type: "error", code: ServerErrors.GameNotFound })
      );
      return;
    }

    connections.persist(playerId, connection);
    game.send(GameModel.events.join(playerId, username));
    // Send back the state of the game
    publishContext(game.state, connections);

    // Assign an ID for the user for reconnection
    connection.socket.send(
      JSON.stringify({
        type: "auth",
        playerId: playerId,
      })
    );
    // Broadcast the events received to the state machine
    connection.socket.on("message", (rawMessage) => {
      const message = JSON.parse(rawMessage.toLocaleString()) as GameEvent;
      game.send({ ...message, playerId: playerId });
    });
    // The user is disconnected
    connection.socket.on("close", (message) => {
      connections.remove(playerId);
      game.send(GameModel.events.leave(playerId));
      games.check(gameId);
    });
  } catch (e: any) {
    if (e.code === "ERR_CRYPTO_INVALID_IV") {
      connection.socket.send(
        JSON.stringify({ type: "error", code: ServerErrors.AuthError })
      );
    }
  }
});

fastify.post("/api/games", (req, res) => {
  const gameId = games.create();
  res.send({ gameId });
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
