import type { PointerEventHandler, ReactNode, PointerEvent } from "react";
import { useGameContext } from "../GameContextProvider";
import { useState } from "react";
import { Point } from "../../types";
import { round } from "../../func/number";
import { GameModel } from "../../machine/GameModel";
import { Lines } from "./Lines";
import { pathForLine } from "../../func/svg";
import { canDrawLine } from "../../machine/guards";
import { Countdown } from "./Countdown";

const DrawArea = {
  background: "white",
  borderRadius: "3px",
  maxWidth: "80vw",
  maxHeight: "80vh",
  aspectRatio: "1/1",
  margin: "0 auto",
};

const precision = 6;
const pointForEvent = (e: PointerEvent) => {
  const parent = (e.target as HTMLDivElement).getBoundingClientRect();
  return {
    x: round((e.clientX - parent.x) / parent.width, precision),
    y: round((e.clientY - parent.y) / parent.height, precision),
  };
};

export function Drawing() {
  const { context, sendMessage, userId } = useGameContext();
  const [start, setStart] = useState<Point | null>(null);
  const [end, setEnd] = useState<Point | null>(null);

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!canDrawLine(context)) {
      return null;
    }
    setStart(pointForEvent(e));
    setEnd(null);
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (e) => {
    if (start && end) {
      sendMessage(GameModel.events.drawLine(userId, start, end));
    }
    setStart(null);
    setEnd(null);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!start) {
      return null;
    }
    setEnd(pointForEvent(e));
  };

  const linesLeft = context.linesLimit - context.lines.length;

  return (
    <div>
      <Countdown limit={context.roundEndAt} />
      <p>
        A vous de dessiner ! <strong>{context.wordToGuess?.name}</strong>
      </p>
      <p>{linesLeft} lignes restantes</p>
      <div
        style={DrawArea}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        <svg viewBox="0 0 1 1" style={{ pointerEvents: "none" }}>
          {start && end && (
            <path
              stroke="#000"
              d={pathForLine({ start, end })}
              strokeWidth="0.01"
              strokeLinecap="round"
            />
          )}
          <Lines animated={false} lines={context.lines} />
        </svg>
      </div>
    </div>
  );
}
