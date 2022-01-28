import { FormEventHandler, useState } from "react";
import { QueryParams } from "../constants";
import { fetchApi } from "../func/api";
import { CreatePlayerResponse, GameId } from "../types";
import { PlayerSessionPersister } from "../front/PlayerSessionPersister";
import { generateGameId } from "../func/game";
import { replaceQueryParams } from "../func/url";
import { useGameContext } from "../front/GameContextProvider";
import { useSearchParams } from "./useSearchParams";

export function useChooseName() {
  const { connect } = useGameContext();
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const chooseName: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get(QueryParams.Name)?.toString() || "";
    if (!name) {
      alert("Vous devez choisir un pseudo");
    }
    setLoading(true);
    const response = await fetchApi<CreatePlayerResponse>("/api/players", {
      method: "POST",
    });
    const credentials = PlayerSessionPersister.savePlayer({
      ...response,
      name,
    });
    const gameId = (params.get(QueryParams.GameId) ||
      generateGameId()) as GameId;
    connect(gameId, credentials);
    replaceQueryParams({
      [QueryParams.GameId]: gameId,
    });
  };
  return {
    loading,
    chooseName,
  };
}
