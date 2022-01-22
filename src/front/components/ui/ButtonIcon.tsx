import type { FunctionComponent, HTMLAttributes } from "react";

type ButtonIconProps = {
  icon: FunctionComponent<{ size: number }>;
  size?: number;
  disabled: boolean;
  title?: string;
} & HTMLAttributes<HTMLButtonElement>;

export function ButtonIcon({
  icon: IconComponent,
  size = 16,
  disabled,
  title,
  ...props
}: ButtonIconProps) {
  return (
    <button
      className="btn-icon"
      aria-label={title}
      disabled={disabled}
      {...props}
    >
      <IconComponent size={size} />
    </button>
  );
}
