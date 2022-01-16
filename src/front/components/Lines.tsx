import { Line } from "../../types";
import { lengthForLine, pathForLine } from "../../func/svg";

type LinesProps = {
  lines: Line[];
  animated?: boolean;
};

export function Lines({ lines, animated = true }: LinesProps) {
  return (
    <>
      {lines.map((line, k) => (
        <path
          key={k}
          stroke="#000"
          className={animated ? "animatedLine" : undefined}
          strokeDasharray={animated ? lengthForLine(line) : undefined}
          strokeDashoffset={animated ? lengthForLine(line) : undefined}
          d={pathForLine(line)}
          strokeWidth="0.01"
          strokeLinecap="round"
        />
      ))}
    </>
  );
}
