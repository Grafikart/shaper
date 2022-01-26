import type { CSSProperties, ReactNode } from "react";
import { useGameContext } from "../../GameContextProvider";
import { SkullIcon } from "../ui/Icons";
import { ButtonIcon } from "../ui/ButtonIcon";
import { GameModel } from "../../../machine/GameModel";
import { prevent } from "../../../func/dom";
import {
  GameContext,
  GameEventEmitter,
  Player,
  PlayerId,
} from "../../../types";
import { canBan } from "../../../machine/guards";

export function Scoreboard() {
  const { context, sendMessage, playerId } = useGameContext();
  const sortedPlayers = [...context.players].sort((a, b) => b.score - a.score);

  return (
    <div className="card padded" style={{ gridArea: "scoreboard" }}>
      <div className="card__title">Scoreboard</div>
      <ul className="list">
        {sortedPlayers.map((p) => (
          <ScoreboardItem
            key={p.id}
            player={p}
            currentPlayerId={playerId}
            sendMessage={sendMessage}
            context={context}
          />
        ))}
      </ul>
    </div>
  );
}

type ScoreboardItemProps = {
  currentPlayerId: PlayerId;
  player: Player;
  sendMessage: GameEventEmitter;
  context: GameContext;
};

function ScoreboardItem({
  currentPlayerId,
  player,
  context,
  sendMessage,
}: ScoreboardItemProps) {
  const banEvent = GameModel.events.ban(currentPlayerId, player.id);
  return (
    <li className="flex" style={{ "--gap": 0.5 } as CSSProperties}>
      <ButtonIcon
        onClick={prevent(() => sendMessage(banEvent))}
        icon={SkullIcon}
        disabled={!canBan(context, banEvent)}
        title="Bannir cet utilisateur"
      />
      <div>
        {player.score} <span className="playername">{player.name}</span>
      </div>
    </li>
  );
}
