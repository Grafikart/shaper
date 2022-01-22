import { useEffect, useState } from "react";
import { ClockIcon } from "./ui/Icons";

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

  return (
    <div className="flex">
      <ClockIcon size={23} />
      &nbsp;
      {Math.ceil((limit - Date.now()) / 1000)}s
    </div>
  );
}
