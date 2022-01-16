import { useGameContext } from "../GameContextProvider";
import { Lines } from "./Lines";

const DrawArea = {
  background: "white",
  borderRadius: "3px",
  maxWidth: "80vw",
  maxHeight: "80vh",
  aspectRatio: "1/1",
  margin: "0 auto",
};

export function Guessing() {
  const { context } = useGameContext();

  return (
    <div style={DrawArea}>
      <svg viewBox="0 0 1 1" style={{ pointerEvents: "none" }}>
        <Lines lines={context.lines} />
      </svg>
    </div>
  );
}
