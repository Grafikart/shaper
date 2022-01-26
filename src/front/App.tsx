import { useGameContext } from "./GameContextProvider";
import { LobbyScreen } from "./components/LobbyScreen";
import { WordSelectorScreen } from "./components/WordSelectorScreen";
import { GameStates } from "../machine/GameStates";
import { EndScreen } from "./components/EndScreen";
import { SuccessScreen } from "./components/SuccessScreen";
import { FailureScreen } from "./components/FailureScreen";
import { DrawingScreen } from "./components/DrawingScreen";
import { GuessingScreen } from "./components/GuessingScreen";
import { HomeScreen } from "./components/HomeScreen";
import { urlSearchParams } from "../func/url";
import { JoinGameScreen } from "./components/JoinGameScreen";

export function App() {
  const { state, context, playerId } = useGameContext();
  const searchParams = urlSearchParams();

  // Player is not yet connected to the websocket
  if (!state) {
    return searchParams.get("gameId") ? <JoinGameScreen /> : <HomeScreen />;
  }

  // Websockets are ready but the context is in a bad state
  if (!context.players) {
    return null;
  }

  const me = context.players.find((p) => p.id === playerId);
  const isMeCurrentPlayer = me?.id === context.currentPlayer?.id;
  const modalStates = [
    GameStates.guessing,
    GameStates.success,
    GameStates.failure,
    GameStates.chooseWord,
  ];
  return (
    <div>
      {state === GameStates.lobby && <LobbyScreen />}
      {state === GameStates.chooseWord && <WordSelectorScreen />}
      {modalStates.includes(state) &&
        (isMeCurrentPlayer ? <DrawingScreen /> : <GuessingScreen />)}
      {state === GameStates.success && <SuccessScreen />}
      {state === GameStates.failure && <FailureScreen />}
      {state === GameStates.end && <EndScreen />}
    </div>
  );
}
