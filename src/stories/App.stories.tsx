import { App } from "../front/App";
import { ComponentStory } from "@storybook/react";
import React, { ComponentProps } from "react";
import { GameModel } from "../machine/GameModel";
import { GameContext, PlayerId } from "../types";
import { time } from "../func/number";
import { GameStates } from "../machine/GameStates";
import { FakeGameContextProvider } from "../front/GameContextProvider";

export default {
  title: "App",
  component: App,
};

const players = time(25, (k) => ({
  id: k.toString() as PlayerId,
  name: `Player ${k}`,
  ready: true,
  score: 0,
}));

const BaseContext: GameContext = {
  ...GameModel.initialContext,
  players: players,
  guesses: time(5, (k) => ({
    word: `Hello${k}`,
    playerId: players[1].id,
  })),
  wordToGuess: {
    name: "Cat",
    score: 1,
  },
  lines: [{ start: { x: 0.2, y: 0.2 }, end: { x: 0.8, y: 0.8 } }],
  currentPlayer: players[0],
};

const Template: ComponentStory<typeof FakeGameContextProvider> = (
  args: ComponentProps<typeof FakeGameContextProvider>
) => (
  <FakeGameContextProvider {...args}>
    <App />
  </FakeGameContextProvider>
);

export const HomeScreen = Template.bind({});
HomeScreen.args = {
  state: GameStates.null,
  ctx: {} as GameContext,
  playerId: BaseContext.players[0].id,
};

export const Draw = Template.bind({});
Draw.args = {
  state: GameStates.guessing,
  ctx: BaseContext,
  playerId: BaseContext.players[0].id,
};

export const DrawNoGuess = Template.bind({});
DrawNoGuess.args = {
  state: GameStates.guessing,
  ctx: { ...BaseContext, guesses: [] },
  playerId: BaseContext.players[0].id,
};

export const Guessing = Template.bind({});
Guessing.args = {
  state: GameStates.guessing,
  ctx: BaseContext,
  playerId: BaseContext.players[1].id,
};

export const GuessingNoGuess = Template.bind({});
GuessingNoGuess.args = {
  state: GameStates.guessing,
  ctx: { ...BaseContext, guesses: [] },
  playerId: BaseContext.players[1].id,
};
