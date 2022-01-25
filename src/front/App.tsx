import type { ReactNode } from "react";
import { useGameContext } from "./GameContextProvider";
import { Lobby } from "./components/Lobby";
import { WordSelector } from "./components/WordSelector";
import { GameStates } from "../machine/GameStates";
import { End } from "./components/End";
import { Success } from "./components/Success";
import { Failure } from "./components/Failure";
import { Drawing } from "./components/Drawing";
import { Guessing } from "./components/Guessing";

type AppProps = {
  children: ReactNode;
};

export function App() {
  const { state, context, sendMessage, userId } = useGameContext();
  if (!context.players) {
    return null;
  }
  const me = context.players.find((p) => p.id === userId);
  const isMeCurrentPlayer = me?.id === context.currentPlayer?.id;
  const modalStates = [
    GameStates.guessing,
    GameStates.success,
    GameStates.failure,
    GameStates.chooseWord,
  ];
  return (
    <div>
      {me && <h2>{me.name}</h2>}
      {state === GameStates.lobby && <Lobby />}
      {state === GameStates.chooseWord && <WordSelector />}
      {modalStates.includes(state) &&
        (isMeCurrentPlayer ? <Drawing /> : <Guessing />)}
      {state === GameStates.success && <Success />}
      {state === GameStates.failure && <Failure />}
      {state === GameStates.end && <End />}
      <p>
        <strong>Etat :</strong> {state}
      </p>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
}
