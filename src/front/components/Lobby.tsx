import { GameContext, GameEventEmitter, Player } from "../../types";
import { GameModel } from "../../machine/GameModel";
import { canBan, canReady, canStartGame } from "../../machine/guards";
import { useGameContext } from "../GameContextProvider";
import { CSSProperties, MouseEventHandler, SyntheticEvent } from "react";
import { Button } from "./ui/Button";
import { ButtonIcon } from "./ui/ButtonIcon";
import { prevent } from "../../func/dom";
import { CrossIcon, SkullIcon, SuccessIcon } from "./ui/Icons";
import clsx from "clsx";

type LobbyProps = {
  context: GameContext;
  sendMessage: GameEventEmitter;
};

export function Lobby() {
  const { context, sendMessage, userId } = useGameContext();
  const handleReady = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(GameModel.events.ready(userId));
  };
  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendMessage(GameModel.events.start(userId));
  };
  return (
    <div className="container layout-base">
      <div className="card padded text-center">
        <h2 className="mb-1">Bienvenue sur shaper</h2>
        <p>
          Le but du jeu est de faire deviner aux autres joueur un{" "}
          <span className="word">mot</span> mais vous n'avez pas le droit qu'à{" "}
          <mark>15 traits</mark> !
        </p>
      </div>
      <div className="card padded stack">
        <ul className="list">
          {context.players.map((player) => (
            <PlayerLine player={player} key={player.id} />
          ))}
        </ul>

        {canReady(context, GameModel.events.ready(userId)) && (
          <Button onClick={handleReady}>Je suis prêt</Button>
        )}

        <Button
          onClick={handleStart}
          disabled={!canStartGame(context, { playerId: userId })}
        >
          Démarrer la partie
        </Button>
      </div>
    </div>
  );
}

function PlayerLine({ player }: { player: Player }) {
  return (
    <li className="flex" style={{ "--gap": 0.5 } as CSSProperties}>
      {player.ready ? (
        <div className="text-success">
          <SuccessIcon size={20} />
        </div>
      ) : (
        <div className="text-muted">
          <CrossIcon size={20} />
        </div>
      )}
      {player.name}
    </li>
  );
}
