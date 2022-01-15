import type { ReactNode } from "react";
import { useGameContext } from "./GameContextProvider";
import { Lobby } from "./components/Lobby";

type AppProps = {
  children: ReactNode;
};

export function App() {
  const { state, context, sendMessage } = useGameContext();
  return (
    <div>
      {state === "lobby" && <Lobby />}
      {state === "chooseWord" && <div>Un joueur choisit un mot !</div>}
      <p>
        <strong>Etat :</strong> {state}
      </p>
      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  );
}
