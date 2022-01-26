import type { HTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  full?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({ children, disabled, full, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={clsx("btn", full && "btn--full")}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
