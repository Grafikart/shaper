import { Modal } from "./ui/Modal";
import { Lines } from "./shared/Lines";
import { useGameContext } from "../GameContextProvider";

export function FailureScreen() {
  const { context } = useGameContext();
  const word = context.wordToGuess?.name;
  return (
    <Modal error>
      <svg
        className="modal__drawarea"
        viewBox="0 0 1 1"
        style={{ pointerEvents: "none" }}
      >
        <Lines lines={context.lines} />
      </svg>
      <p>
        Personne n’a deviné que <mark>{context.currentPlayer?.name}</mark>
        <br />a voulu dessiner un(e) <span className="word">{word}</span> :(
      </p>
    </Modal>
  );
}
