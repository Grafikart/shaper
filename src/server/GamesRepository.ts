import { interpret, InterpreterFrom } from "xstate";
import { GameMachine } from "../machine/GameMachine";
import { GameModel } from "../machine/GameModel";
import { publishContext } from "../func/socket";
import { GameStates } from "../machine/GameStates";
import { GameId } from "../types";
import { randomUUID } from "node:crypto";
import { ConnectionRepository } from "./ConnectionRepository";

type Machine = InterpreterFrom<typeof GameMachine>;

export class GamesRepository {
  constructor(
    private connections: ConnectionRepository,
    private games = new Map<GameId, Machine>()
  ) {}

  create(): GameId {
    const gameId = randomUUID() as GameId;
    const gameService = interpret(
      GameMachine.withContext(GameModel.initialContext)
    )
      .onTransition((state) => {
        publishContext(
          state.value as GameStates,
          state.context,
          this.connections
        );
      })
      .start();
    this.games.set(gameId, gameService);
    return gameId;
  }

  find(gameId: GameId) {
    return this.games.get(gameId);
  }
}
