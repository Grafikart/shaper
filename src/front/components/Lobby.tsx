import { GameContext, GameEventEmitter, Player } from "../../types";
import { GameModel } from "../../machine/model";
import { canJoinTeam, canStartGame } from "../../machine/guards";
import { useGameContext } from "../GameContextProvider";
import { MouseEventHandler } from "react";

type LobbyProps = {
  context: GameContext;
  sendMessage: GameEventEmitter;
};

const playersForTeam = (team: number, players: Player[]) =>
  players.filter((p) => p.team === team);

export function Lobby() {
  const { state, context, sendMessage, userId } = useGameContext();
  const players = context.players;
  const noTeamPlayers = players.filter((p) => p.team === null);
  const handleJoinTeam = (team: number) => () => {
    sendMessage(GameModel.events.joinTeam(userId, team));
    // sendMessage("chooseTeam", { team });
  };
  const handleStart: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    sendMessage(GameModel.events.start(userId));
  };
  return (
    <div>
      <ul>
        {noTeamPlayers.map((player) => (
          <li key={player.id}>Joueur {player.name}</li>
        ))}
      </ul>

      <div style={{ display: "flex" }}>
        {[0, 1].map((team) => (
          <div key={team} style={{ width: "50%" }}>
            <h2>TEAM {team + 1}</h2>
            <ul>
              {playersForTeam(team, players).map((player) => (
                <li key={player.id}>Joueur {player.name}</li>
              ))}
            </ul>
            <button
              disabled={!canJoinTeam(context, { team: team })}
              style={{ width: "auto" }}
              onClick={handleJoinTeam(team)}
            >
              Rejoindre cette équipe
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={handleStart}
          disabled={!canStartGame(context, { playerId: userId })}
        >
          Démarrer la partie
        </button>
      </div>
    </div>
  );
}
