import type { SyntheticEvent } from "react";
import { useGameContext } from "../GameContextProvider";
import { GameModel } from "../../machine/GameModel";
import { Modal } from "./ui/Modal";
import { ClockIcon } from "./ui/Icons";
import { Button } from "./ui/Button";
import { CSSProperties } from "react";

const smallGap = { "--gap": 0.5 } as CSSProperties;

export function WordSelector() {
  const { context, userId, sendMessage } = useGameContext();
  if (userId !== context.currentPlayer?.id) {
    return (
      <Modal>
        <div className="stack center">
          <div className="countdown">
            <ClockIcon size={50} />
          </div>
          <p className="text-center">
            <mark>{context.currentPlayer?.name}</mark> est en train de choisir
            un mot
          </p>
        </div>
      </Modal>
    );
  }

  const handleChooseWord = (word: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(GameModel.events.chooseWord(userId, word));
  };

  return (
    <Modal>
      <div className="stack center">
        <h2>Quel mot faire deviner ?</h2>
        <ul className="flex" style={smallGap}>
          {context.availableWords.map((word) => (
            <li className="stack" style={smallGap} key={word.name}>
              <span className="word">{word.name}</span> ({word.score} points)
              <br />
              <Button onClick={handleChooseWord(word.name)}>
                Choisir ce mot
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}
