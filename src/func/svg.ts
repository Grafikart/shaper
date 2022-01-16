import { Line } from "../types";

export function pathForLine({ start, end }: Line) {
  return `M${start.x} ${start.y} L${end.x} ${end.y}`;
}

export function lengthForLine({ start, end }: Line) {
  return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2));
}
