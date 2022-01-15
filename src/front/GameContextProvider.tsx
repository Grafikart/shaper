import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  AppMessage,
  GameContext,
  GameEvent,
  GameMachineStates,
} from "../types";
import { GameStates } from "../machine/states";

export type GameContextType = {
  state: GameStates;
  context: GameContext;
  sendMessage: (data: GameEvent) => void;
};

const Context = createContext<GameContextType>({
  state: "lobby" as GameStates,
  context: {} as GameContext,
  sendMessage: () => null,
});

type Props = {
  children: ReactNode;
};

const socket = new WebSocket("ws://localhost:8000/ws");
const sendMessage: GameContextType["sendMessage"] = (data: GameEvent) => {
  socket.send(JSON.stringify(data));
};

export function GameContextProvider({ children }: Props) {
  const [state, setState] = useState<Omit<GameContextType, "sendMessage">>({
    state: "" as GameStates,
    context: {} as GameContext,
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
    <Context.Provider value={{ ...state, sendMessage }}>
      {children}
    </Context.Provider>
  );
}

export function useGameContext() {
  return useContext(Context);
}
