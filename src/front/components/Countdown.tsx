import { useEffect, useState } from "react";

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

  return <div>{Math.ceil((limit - Date.now()) / 1000)} secondes restants</div>;
}
