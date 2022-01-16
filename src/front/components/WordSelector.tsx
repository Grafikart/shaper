import type { SyntheticEvent } from "react";
import { useGameContext } from "../GameContextProvider";
import { GameModel } from "../../machine/GameModel";

export function WordSelector() {
  const { context, userId, sendMessage } = useGameContext();
  if (userId !== context.currentPlayer?.id) {
    return (
      <div>{context.currentPlayer?.name} est en train de choisir un mot</div>
    );
  }

  const handleChooseWord = (word: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(GameModel.events.chooseWord(userId, word));
  };

  return (
    <div>
      <h2>Vous devez choisir un mot à faire deviner</h2>
      <ul>
        {context.availableWords.map((word) => (
          <li key={word.name}>
            <strong>{word.name}</strong>
            <br />
            score {word.score} <br />
            <button onClick={handleChooseWord(word.name)}>
              Choisir ce mot
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
