import { useGameContext } from "../GameContextProvider";
import { GameModel } from "../../machine/GameModel";
import { canStartGame } from "../../machine/guards";

export function End() {
  const { context, sendMessage, userId } = useGameContext();
  const winner = context.players.find((p) => p.score >= context.scoreLimit);
  if (!winner) {
    throw new Error("Aucun joueur ne semble avoir gagné");
  }
  const retryEvent = GameModel.events.retry(userId);

  const handleReset = () => {
    sendMessage(retryEvent);
  };

  return (
    <div>
      <p>
        <strong>{winner.name}</strong> a gagné !!
      </p>
      <p>
        <button
          onClick={handleReset}
          disabled={!canStartGame(context, retryEvent)}
        >
          Relancer la partie
        </button>
      </p>
    </div>
  );
}
