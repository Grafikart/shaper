import { useGameContext } from "../GameContextProvider";
import { Lines } from "./shared/Lines";
import { GameModel } from "../../machine/GameModel";
import { FormEventHandler } from "react";
import { Countdown } from "./shared/Countdown";
import { Scoreboard } from "./shared/Scoreboard";
import { GuessForm } from "./shared/GuessForm";
import { Guesses } from "./shared/Guesses";
import clsx from "clsx";

export function GuessingScreen() {
  const { context, sendMessage, playerId } = useGameContext();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const word = new FormData(form).get("word")?.toString() || "";
    if (word.length > 0) {
      sendMessage(GameModel.events.guessWord(playerId, word));
      form.reset();
    }
  };

  return (
    <div className="container">
      <div
        className={clsx(
          "layout-guess",
          context.guesses.length == 0 && "layout-guess--no-guess"
        )}
      >
        <div className="drawarea card">
          <div className="drawarea__header">
            <div>
              C'est <mark>{context.currentPlayer?.name}</mark> qui dessine
            </div>
            <Countdown limit={context.roundEndAt} />
          </div>
          <div className="drawarea__canvas">
            <svg viewBox="0 0 1 1" style={{ pointerEvents: "none" }}>
              <Lines lines={context.lines} />
            </svg>
          </div>
        </div>
        <GuessForm onSubmit={handleSubmit} />
        <Guesses />
        <Scoreboard />
      </div>
    </div>
  );
}
