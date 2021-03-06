import { interpret, InterpreterFrom } from "xstate";
import { GameMachine } from "../machine/GameMachine";
import { GameModel } from "../machine/GameModel";
import { publishContext } from "../func/socket";
import { GameId } from "../types";
import { v4 as uuid } from "uuid";
import { ConnectionRepository } from "./ConnectionRepository";

type Machine = InterpreterFrom<typeof GameMachine>;

export class GamesRepository {
  constructor(
    private connections: ConnectionRepository,
    private games = new Map<GameId, Machine>()
  ) {}

  create(id: GameId) {
    const gameService = interpret(
      GameMachine.withContext(GameModel.initialContext)
    )
      .onTransition((state) => {
        publishContext(state, this.connections);
      })
      .start();
    this.games.set(id, gameService);
    return gameService;
  }

  find(gameId: GameId) {
    return this.games.get(gameId);
  }

  /**
   * Check the game status and destroy it if it's empty
   */
  check(gameId: GameId) {
    const game = this.find(gameId);
    if (!game) {
      return;
    }
    const connectedPlayers = game.state.context.players.filter((p) =>
      this.connections.has(p.id)
    );
    if (connectedPlayers.length === 0) {
      this.games.delete(gameId);
    }
  }
}
