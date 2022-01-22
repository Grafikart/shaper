import type { CSSProperties, ReactNode } from "react";
import { useGameContext } from "../GameContextProvider";
import { SkullIcon } from "./ui/Icons";
import { ButtonIcon } from "./ui/ButtonIcon";
import { GameModel } from "../../machine/GameModel";
import { prevent } from "../../func/dom";
import { GameContext, GameEventEmitter, Player } from "../../types";
import { canBan } from "../../machine/guards";

export function Scoreboard() {
  const { context, sendMessage, userId } = useGameContext();

  return (
    <div className="card padded" style={{ gridArea: "scoreboard" }}>
      <div className="card__title">Scoreboard</div>
      <ul className="list">
        {context.players.map((p) => (
          <ScoreboardItem
            key={p.id}
            player={p}
            currentPlayerId={userId}
            sendMessage={sendMessage}
            context={context}
          />
        ))}
      </ul>
    </div>
  );
}

type ScoreboardItemProps = {
  currentPlayerId: Player["id"];
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
