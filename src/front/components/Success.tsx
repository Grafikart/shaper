import type { ReactNode } from "react";
import { useGameContext } from "../GameContextProvider";
import { Lines } from "./Lines";
import { Modal } from "./ui/Modal";

export function Success() {
  const { context } = useGameContext();
  const word = context.guesses[0].word;
  const winner = context.players.find(
    (p) => p.id === context.guesses[0].playerId
  );

  return (
    <Modal>
      <svg
        className="modal__drawarea"
        viewBox="0 0 1 1"
        style={{ pointerEvents: "none" }}
      >
        <Lines lines={context.lines} />
      </svg>
      <p>
        Bravo à <mark>{winner?.name}</mark> qui a deviné !
        <br />
        C’était un(e) <span className="word">{word}</span>
      </p>
    </Modal>
  );
}
