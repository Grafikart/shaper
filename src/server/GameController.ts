import type { Context, GameEvent } from "../types";
import { Interpreter } from "xstate";
import type { Typestate } from "xstate/lib/types";
import type { SocketStream } from "fastify-websocket";

export class GameController {
  constructor(
    private gameInstance: Interpreter<
      Context,
      any,
      GameEvent,
      Typestate<Context>
    >,
    private connection: SocketStream
  ) {}

  chooseTeam({ team }: { team: number }) {
    this.gameInstance.send("CHOOSE_TEAM", {
      connection: this.connection,
      team: team,
    });
  }
}
