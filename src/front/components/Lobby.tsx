import type { ReactNode } from "react";
import { GameContext, Player } from "../../types";
import { GameContextType } from "../GameContextProvider";
import { GameModel } from "../../machine/model";

type LobbyProps = {
  players: GameContext["players"];
  sendMessage: GameContextType["sendMessage"];
};

const playersForTeam = (team: number, players: Player[]) =>
  players.filter((p) => p.team === team);

export function Lobby({ players, sendMessage }: LobbyProps) {
  const noTeamPlayers = players.filter((p) => p.team === null);
  const handleJoinTeam = (team: number) => () => {
    sendMessage(GameModel.events.joinTeam("", team));
    // sendMessage("chooseTeam", { team });
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
            <button style={{ width: "auto" }} onClick={handleJoinTeam(team)}>
              Rejoindre cette équipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
