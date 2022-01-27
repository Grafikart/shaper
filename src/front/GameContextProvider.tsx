import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GameContext,
  GameEvent,
  GameEventEmitter,
  GameId,
  PlayerId,
  SocketMessage,
} from "../types";
import { GameStates } from "../machine/GameStates";
import ReconnectingWebSocket from "reconnecting-websocket";
import { UserSession } from "./UserSession";
import { replaceQueryParams } from "../func/url";
import { ServerErrors } from "../constants";
import { interpret } from "xstate";
import { GameMachine } from "../machine/GameMachine";

type GameContextType = {
  state: GameStates;
  context: GameContext;
  playerId: PlayerId;
  sendMessage: GameEventEmitter;
  connect: (gameId: GameId, username?: string | null) => void;
  connected: boolean;
};

const Context = createContext<GameContextType>({
  state: "lobby" as GameStates,
  context: {} as GameContext,
  playerId: "user" as PlayerId,
  sendMessage: () => null,
  connect: () => null,
  connected: false,
});

type Props = {
  children: ReactNode;
};

export function GameContextProvider({ children }: Props) {
  const [socket, setSocket] = useState<ReconnectingWebSocket | null>(null);
  const userSession = useMemo(() => new UserSession(), []);
  const [state, setState] = useState<
    Omit<GameContextType, "sendMessage" | "connect">
  >({
    state: "" as GameStates,
    playerId: "" as PlayerId,
    context: {} as GameContext,
    connected: socket !== null,
  });

  // Connecte un utilisateur à une partie
  const connect: GameContextType["connect"] = (gameId, username) => {
    const searchParams = new URLSearchParams();
    const playerId = userSession.getId();
    if (playerId) {
      searchParams.set("playerId", playerId);
    }
    if (username) {
      searchParams.set("username", username);
    }
    searchParams.set("gameId", gameId);
    const socket = new ReconnectingWebSocket(
      `${window.location.protocol.replace("http", "ws")}//${
        window.location.host
      }/ws?${searchParams.toString()}`
    );

    setSocket(socket);
  };

  // Envoie un message au websocket
  const sendMessage: GameContextType["sendMessage"] = useCallback(
    (data: GameEvent) => {
      socket?.send(JSON.stringify(data));
    },
    [socket]
  );

  useEffect(() => {
    if (!socket) {
      const url = new URL(window.location.href);
      const gameId = url.searchParams.get("gameId") as GameId;
      const name = url.searchParams.get("name");
      if (gameId && name) {
        connect(gameId, name);
      }
      return;
    }
    const onMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data) as SocketMessage;

      // En cas d'authentification
      if (message.type === "auth") {
        userSession.setId(message.playerId);
        setState((s) => ({ ...s, playerId: message.playerId }));
      } else if (message.type === "error") {
        if (message.code === ServerErrors.AuthError) {
          userSession.clear();
        }
        socket.close();
        replaceQueryParams();
      } else {
        setState((s) => ({ ...s, ...message }));
      }
    };
    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket]);

  return (
    <Context.Provider value={{ ...state, sendMessage, connect }}>
      {children}
    </Context.Provider>
  );
}

export function useGameContext() {
  return useContext(Context);
}

/**
 * For test purpose
 */
export function FakeGameContextProvider(props: {
  state: GameStates;
  ctx: GameContext;
  playerId: PlayerId;
}) {
  const [context, setContext] = useState<GameContext>(props.ctx);
  const [state, setState] = useState<GameStates>(props.state);

  // Use a local machine for test purpose
  const service = useMemo(() => {
    return interpret(GameMachine.withContext(props.ctx))
      .onTransition((state) => {
        setContext(state.context);
        setState(state.value as GameStates);
      })
      .start(props.state);
  }, []);

  return (
    <Context.Provider
      value={{
        state,
        context,
        playerId: props.playerId,
        sendMessage: service.send,
        connect: () => null,
        connected: true,
      }}
      {...props}
    />
  );
}
