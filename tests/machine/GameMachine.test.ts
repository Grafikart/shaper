import { it, describe, assert, beforeEach, afterEach, vi } from "vitest";
import { interpret } from "xstate";
import { GameMachine } from "../../src/machine/GameMachine";
import { GameModel } from "../../src/machine/GameModel";
import { GameStates } from "../../src/machine/GameStates";
import { time } from "../../src/func/number";
import { GameContext, PlayerId } from "../../src/types";

const players = time(25, (k) => ({
  id: k.toString() as PlayerId,
  name: `Player ${k}`,
  ready: true,
  score: 0,
}));

const BaseContext: GameContext = {
  ...GameModel.initialContext,
  players: players,
  wordToGuess: {
    name: "Cat",
    score: 1,
  },
  lines: [{ start: { x: 0.2, y: 0.2 }, end: { x: 0.8, y: 0.8 } }],
  currentPlayer: players[0],
};

describe("GameMachine", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should avoid multiple message in bulk", () => {
    const m = interpret(GameMachine.withContext(BaseContext)).start(
      GameStates.guessing
    );

    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[1].id, "Hello")).context
        .guesses,
      1
    );
    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[1].id, "Hello2")).context
        .guesses,
      1
    );
  });

  it("should let post multiple message with enough time", () => {
    const date = new Date(2000, 1, 1, 13, 0, 0);
    vi.setSystemTime(date);
    const m = interpret(GameMachine.withContext(BaseContext)).start(
      GameStates.guessing
    );

    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[1].id, "Hello")).context
        .guesses,
      1
    );

    date.setSeconds(10);
    vi.setSystemTime(date);
    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[1].id, "Hello2")).context
        .guesses,
      2
    );
  });

  it("should prevent the same word multiple time", () => {
    const m = interpret(GameMachine.withContext(BaseContext)).start(
      GameStates.guessing
    );

    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[1].id, "Hello")).context
        .guesses,
      1
    );
    assert.lengthOf(
      m.send(GameModel.events.guessWord(players[2].id, "Hello")).context
        .guesses,
      1
    );
  });
});
