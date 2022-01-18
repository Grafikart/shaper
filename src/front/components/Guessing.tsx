import { useGameContext } from "../GameContextProvider";
import { Lines } from "./Lines";
import { GameModel } from "../../machine/GameModel";
import { FormEventHandler, useState } from "react";
import { Countdown } from "./Countdown";

const DrawArea = {
  background: "white",
  borderRadius: "3px",
  maxWidth: "80vw",
  maxHeight: "80vh",
  aspectRatio: "1/1",
  margin: "0 auto",
};

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
    <>
      <Countdown limit={context.roundEndAt} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          minHeight: 500,
        }}
      >
        <div style={DrawArea}>
          <svg viewBox="0 0 1 1" style={{ pointerEvents: "none" }}>
            <Lines lines={context.lines} />
          </svg>
        </div>
        <div>
          <form action="" onSubmit={handleSubmit}>
            <input
              name="word"
              type="text"
              placeholder="Que représente le dessin"
            />
            <button>Deviner</button>
          </form>
          <ul>
            {context.guesses.map((guess) => (
              <li key={guess}>{guess}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
