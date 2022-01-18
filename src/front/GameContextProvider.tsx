import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { GameContext, GameEvent, GameEventEmitter } from "../types";
import { GameStates } from "../machine/GameStates";
import ReconnectingWebSocket from "reconnecting-websocket";

type SocketMessage =
  | {
      type: "auth";
      userId: string;
    }
  | {
      type: "gameUpdate";
      state: GameStates;
      context: GameContext;
    };

type GameContextType = {
  state: GameStates;
  context: GameContext;
  userId: string;
  sendMessage: GameEventEmitter;
};

const Context = createContext<GameContextType>({
  state: "lobby" as GameStates,
  context: {} as GameContext,
  userId: "user",
  sendMessage: () => null,
});

type Props = {
  children: ReactNode;
};

const searchParams = new URLSearchParams();
const userId = localStorage.getItem("userId");
if (userId) {
  searchParams.set("userId", userId);
}
const socket = new ReconnectingWebSocket(
  "ws://localhost:8000/ws?" + searchParams.toString()
);
const sendMessage: GameContextType["sendMessage"] = (data: GameEvent) => {
  socket.send(JSON.stringify(data));
};

socket.addEventListener("close", () => {});

export function GameContextProvider({ children }: Props) {
  const [state, setState] = useState<Omit<GameContextType, "sendMessage">>({
    state: "" as GameStates,
    userId: "",
    context: {} as GameContext,
  });

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as SocketMessage;
      if (message.type === "auth") {
        localStorage.setItem("userId", message.userId);
        setState((s) => ({ ...s, userId: message.userId }));
      } else {
        setState((s) => ({ ...s, ...message }));
      }
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
