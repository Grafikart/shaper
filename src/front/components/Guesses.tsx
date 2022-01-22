import { useGameContext } from "../GameContextProvider";

export function Guesses() {
  const { context } = useGameContext();
  return (
    <div className="card padded">
      <ul className="list" style={{ gridArea: "guesses" }}>
        {context.guesses.map((guess) => (
          <li key={guess}>{guess}</li>
        ))}
      </ul>
    </div>
  );
}
