import type { HTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement>;

export function Button({ children, disabled, ...props }: ButtonProps) {
  return (
    <button disabled={disabled} className="btn" {...props}>
      <span>{children}</span>
    </button>
  );
}
