import type { HTMLAttributes } from "react";

export function Button({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="btn" {...props}>
      <span>{children}</span>
    </button>
  );
}
