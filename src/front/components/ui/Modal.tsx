import type { ReactNode } from "react";
import clsx from "clsx";

type ModalProps = {
  children: ReactNode;
  error?: boolean;
};

export function Modal({ children, error }: ModalProps) {
  return (
    <div className="modal-wrapper">
      <div className={clsx("modal", error && "modal--error")}>
        <div className="modal__body">{children}</div>
        <svg
          className="modal__shape"
          viewBox="0 0 1229 686"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M.5 217C.5 40.5 314.5 8.5 617 0c486 0 611.5 104 611.5 241.5S1098.5 334 1178 480s-66.5 205.5-561 205.5S15 609 67 465.5.5 393.5.5 217Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
