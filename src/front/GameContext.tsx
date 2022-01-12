import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import { AppMessage, Context, GameMachineStates } from "../types";

export type GameContextType = {
  state: GameMachineStates | null;
  context: Partial<Context>;
  sendMessage: (type: AppMessage["type"], data: AppMessage["data"]) => void;
};

const GameContext = createContext<GameContextType>({
  state: null,
  context: {},
  sendMessage: () => null,
});

type Props = {
  children: ReactNode;
};

const socket = new WebSocket("ws://localhost:8000/ws");
const sendMessage: GameContextType["sendMessage"] = (type, data) => {
  socket.send(
    JSON.stringify({
      type: type,
      data: data,
    })
  );
};

export function GameContextProvider({ children }: Props) {
  const [state, setState] = useState<Omit<GameContextType, "sendMessage">>({
    state: null,
    context: {},
  });

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      setState(JSON.parse(event.data));
    };
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <GameContext.Provider value={{ ...state, sendMessage }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  return useContext(GameContext);
}
