import { useEffect, useState } from "react";
import { ClockIcon } from "./ui/Icons";
import clsx from "clsx";

type CountdownProps = {
  limit: number;
};

export function Countdown({ limit }: CountdownProps) {
  const [state, setState] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setState((n) => n + 1), 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const secondsLeft = Math.max(0, Math.ceil((limit - Date.now()) / 1000));

  return (
    <div
      className={clsx(
        "flex countdown",
        secondsLeft < 10 && " countdown--danger"
      )}
    >
      <ClockIcon size={23} />
      &nbsp;
      {secondsLeft}s
    </div>
  );
}
