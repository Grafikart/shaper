import Fastify from "fastify";
import FastifyWS from "fastify-websocket";
import FastifyStatic from "fastify-static";
import path from "path";
import { GameModel } from "../machine/GameModel";
import { v4 as uuid } from "uuid";
import Randanimal from "randanimal";
import { publishContext } from "../func/socket";
import { CreatePlayerResponse, GameEvent, GameId, PlayerId } from "../types";
import { ConnectionRepository } from "./ConnectionRepository";
import { GamesRepository } from "./GamesRepository";
import { ServerErrors } from "../constants";
import { generateKeyPairSync } from "crypto";
import { sign, verify } from "../func/crypto";
import { generatePlayerId } from "../func/game";

const connections = new ConnectionRepository();
const games = new GamesRepository(connections);

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

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
    const signature = query.signature || "";
    const playerName = query.name || Randanimal.randanimalSync();
    const gameId = query.gameId as GameId;

    // Connection is not allowed if we have no gameId
    if (!gameId) {
      connection.end();
      return;
    }

    // PlayerID is not signed correctly
    if (!verify(playerId, signature, publicKey)) {
      connection.socket.send(
        JSON.stringify({ type: "error", code: ServerErrors.AuthError })
      );
      return;
    }

    // Game not found
    const game = games.find(gameId) || games.create(gameId);

    connections.persist(playerId, connection);
    game.send(GameModel.events.join(playerId, playerName));
    // Send back the state of the game
    publishContext(game.state, connections);

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

fastify.post("/api/players", (req, res) => {
  const playerId = generatePlayerId();
  const response: CreatePlayerResponse = {
    playerId: playerId,
    signature: sign(playerId, privateKey),
  };
  res.send(response);
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
