import { useGameContext } from "../GameContextProvider";
import { Lines } from "./Lines";
import { GameModel } from "../../machine/GameModel";
import { FormEventHandler } from "react";
import { Countdown } from "./Countdown";
import { Scoreboard } from "./Scoreboard";
import { GuessForm } from "./GuessForm";
import { Guesses } from "./Guesses";
import clsx from "clsx";

export function Guessing() {
  const { context, sendMessage, userId } = useGameContext();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const word = new FormData(form).get("word")?.toString() || "";
    if (word.length > 0) {
      sendMessage(GameModel.events.guessWord(userId, word));
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
