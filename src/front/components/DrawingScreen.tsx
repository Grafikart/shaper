import type { PointerEventHandler, ReactNode } from "react";
import { useGameContext } from "../GameContextProvider";
import { useEffect, useRef, useState } from "react";
import { Point } from "../../types";
import { round } from "../../func/number";
import { GameModel } from "../../machine/GameModel";
import { Lines } from "./shared/Lines";
import { pathForLine } from "../../func/svg";
import { canDrawLine } from "../../machine/guards";
import { Countdown } from "./shared/Countdown";
import { GuessForm } from "./shared/GuessForm";
import { Guesses } from "./shared/Guesses";
import { Scoreboard } from "./shared/Scoreboard";
import { distance } from "../../func/geometry";

const precision = 6;

/**
 * Find the point coordinate in % corresponding to a specific event
 */
const pointForEvent = (
  e: { clientX: number; clientY: number },
  target: HTMLDivElement
) => {
  const parent = target.getBoundingClientRect();
  return {
    x: round((e.clientX - parent.x) / parent.width, precision),
    y: round((e.clientY - parent.y) / parent.height, precision),
  };
};

/**
 * Drawing screen
 */
export function DrawingScreen() {
  const { context, sendMessage, playerId } = useGameContext();
  const [start, setStart] = useState<Point | null>(null);
  const [end, setEnd] = useState<Point | null>(null);
  const drawAreaRef = useRef<HTMLDivElement>(null);
  const startRef = useRef(start);
  startRef.current = start;

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (e) => {
    if (!canDrawLine(context)) {
      return null;
    }
    setStart(pointForEvent(e, drawAreaRef.current!));
    setEnd(null);
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!startRef.current) {
      return;
    }
    const end = pointForEvent(e, drawAreaRef.current!);
    // We don't want user to send missclicked lines
    if (distance(startRef.current, end) > 0.01) {
      sendMessage(GameModel.events.drawLine(playerId, startRef.current, end));
    }
    setStart(null);
    setEnd(null);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!startRef.current) {
      return null;
    }
    setEnd(pointForEvent(e, drawAreaRef.current!));
  };

  useEffect(() => {
    document.body.addEventListener("pointerup", handlePointerUp);
    document.body.addEventListener("pointermove", handlePointerMove);

    return () => {
      document.body.removeEventListener("pointerup", handlePointerUp);
      document.body.addEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="container">
      <div className="layout-guess">
        <div className="drawarea card">
          <div className="drawarea__header">
            <div>
              Vous devez faire deviner{" "}
              <mark className="word">{context.wordToGuess?.name}</mark>
            </div>
            <Countdown limit={context.roundEndAt} />
          </div>
          <div
            ref={drawAreaRef}
            className="drawarea__canvas"
            onPointerDown={handlePointerDown}
          >
            <div className="drawarea__linecount">
              {context.lines.length} / {context.linesLimit} lignes
            </div>
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
        <Guesses />
        <Scoreboard />
      </div>
    </div>
  );
}
