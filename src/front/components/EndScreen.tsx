import { useGameContext } from "../GameContextProvider";
import { GameModel } from "../../machine/GameModel";
import { canStartGame } from "../../machine/guards";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export function EndScreen() {
  const { context, sendMessage, playerId } = useGameContext();
  const winner = context.players.find((p) => p.score >= context.scoreLimit);
  if (!winner) {
    throw new Error("Aucun joueur ne semble avoir gagné");
  }
  const retryEvent = GameModel.events.retry(playerId);

  const handleReset = () => {
    sendMessage(retryEvent);
  };

  useEffect(() => {
    const y = window.innerHeight / 2;
    console.log(y);
    confetti({
      particleCount: 100,
      zIndex: 3000,
      spread: 90,
      disableForReducedMotion: true,
      colors: [
        "#FFFAE6",
        "#D89348",
        "#35B0A3",
        "#BBA649",
        "#7A673F",
        "#09AFCE",
        "#FCE04E",
        "#E14F13",
      ],
    });
  }, []);

  return (
    <Modal>
      <p className="mb-1">
        Bravo ! <mark>{winner.name}</mark> a gagné !!
      </p>
      <p>
        <Button
          className="btn"
          onClick={handleReset}
          disabled={!canStartGame(context, retryEvent)}
        >
          Relancer la partie
        </Button>
      </p>
    </Modal>
  );
}
