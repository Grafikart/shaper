import { useGameContext } from "../../GameContextProvider";
import { useMemo } from "react";
import { keyBy } from "../../../func/array";
import { Player } from "../../../types";
import { wordProximity } from "../../../func/string";

export function Guesses() {
  const { context } = useGameContext();
  const players = useMemo(
    () => keyBy(context.players, "id"),
    [context.players.length]
  );

  if (context.guesses.length === 0) {
    return null;
  }

  return (
    <div className="card padded">
      <ul className="list" style={{ gridArea: "guesses" }}>
        {context.guesses.map((guess) => (
          <Guess
            key={guess.word}
            word={guess.word}
            player={players[guess.playerId]}
          />
        ))}
      </ul>
    </div>
  );
}

function Guess({ word, player }: { word: string; player?: Player }) {
  if (!player) {
    return null;
  }
  return (
    <li>
      {word} (<span className="playername">{player.name}</span>)
    </li>
  );
}
