import { GameContext, GameEventEmitter } from "../../types";
import { GameModel } from "../../machine/GameModel";
import { canReady, canStartGame } from "../../machine/guards";
import { useGameContext } from "../GameContextProvider";
import { MouseEventHandler, SyntheticEvent } from "react";

type LobbyProps = {
  context: GameContext;
  sendMessage: GameEventEmitter;
};

export function Lobby() {
  const { context, sendMessage, userId } = useGameContext();
  const handleReady = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(GameModel.events.ready(userId));
  };
  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendMessage(GameModel.events.start(userId));
  };
  return (
    <div>
      <ul>
        {context.players.map((player) => (
          <li key={player.id}>
            Joueur {player.name} {player.ready ? "✅" : ""}{" "}
          </li>
        ))}
      </ul>

      {canReady(context, GameModel.events.ready(userId)) && (
        <button onClick={handleReady}>Je suis prêt</button>
      )}
      <div>
        <button
          onClick={handleStart}
          disabled={!canStartGame(context, { playerId: userId })}
        >
          Démarrer la partie
        </button>
      </div>
    </div>
  );
}
