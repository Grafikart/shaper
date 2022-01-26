import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { GameModel } from "../machine/GameModel";
import { randomUUID } from "node:crypto";
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
    const playerId = (
      query.playerId ? query.playerId : randomUUID()
    ) as PlayerId;
    const username = query.username ?? Randanimal.randanimalSync();
    const gameId = query.gameId as GameId;
    if (!gameId) {
      connection.end();
      return;
    }
    const game = games.find(gameId);
    if (!game) {
      connection.socket.send(
        JSON.stringify({ type: "error", code: ServerErrors.GameNotFound })
      );
      return;
    }
    connections.persist(playerId, connection);
    game.send(GameModel.events.join(playerId, username));
    setTimeout(() => {
      connection.socket.send(
        JSON.stringify({
          type: "auth",
          playerId: playerId,
        })
      );
    }, 2000);
    publishContext(
      game.state.value as GameStates,
      game.state.context,
      connections
    );
    connection.socket.on("message", (rawMessage) => {
      const message = JSON.parse(rawMessage.toLocaleString()) as GameEvent;
      game.send({ ...message, playerId: playerId });
    });
    connection.socket.on("close", (message) => {
      connections.remove(playerId);
      game.send(GameModel.events.leave(playerId));
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
