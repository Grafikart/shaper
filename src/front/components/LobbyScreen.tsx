import { GameContext, GameEventEmitter, Player } from "../../types";
import { GameModel } from "../../machine/GameModel";
import {
  canBan,
  canJoinGame,
  canReady,
  canStartGame,
  isHost,
} from "../../machine/guards";
import { useGameContext } from "../GameContextProvider";
import { CSSProperties, MouseEventHandler, SyntheticEvent } from "react";
import { Button } from "./ui/Button";
import { ButtonIcon } from "./ui/ButtonIcon";
import { prevent } from "../../func/dom";
import { CrossIcon, SkullIcon, SuccessIcon } from "./ui/Icons";
import clsx from "clsx";
import { Explanations } from "./shared/Explanations";
import { QueryParams } from "../../constants";

type LobbyProps = {
  context: GameContext;
  sendMessage: GameEventEmitter;
};

export function LobbyScreen() {
  const { context, sendMessage, playerId } = useGameContext();
  const handleReady = (e: SyntheticEvent) => {
    e.preventDefault();
    sendMessage(GameModel.events.ready(playerId));
  };
  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendMessage(GameModel.events.start(playerId));
  };

  const copyLink = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete(QueryParams.Name);
    navigator.clipboard.writeText(url.toString());
    alert("Le lien a été copié dans le presse-papier");
  };

  const showGameLink = !isHost(context, playerId);
  const canStart = canStartGame(context, GameModel.events.start(playerId));

  return (
    <div className="container layout-base">
      <Explanations gameLink={showGameLink}>
        <Button onClick={copyLink}>Copier le lien d'invitation</Button>
      </Explanations>
      <div>
        <div className="card padded stack">
          <ul className="list">
            {context.players.map((player) => (
              <PlayerLine player={player} key={player.id} />
            ))}
          </ul>

          {canReady(context, GameModel.events.ready(playerId)) && (
            <Button onClick={handleReady}>Je suis prêt</Button>
          )}

          <Button onClick={handleStart} disabled={!canStart}>
            Démarrer la partie
          </Button>
        </div>
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
