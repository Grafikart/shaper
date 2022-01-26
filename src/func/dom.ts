import { CSSProperties } from "react";

export function prevent(fn: () => void) {
  return (e: { preventDefault: () => void }) => {
    e.preventDefault();
    return fn();
  };
}

export function gapStyle(n: number) {
  return { "--gap": n } as CSSProperties;
}
