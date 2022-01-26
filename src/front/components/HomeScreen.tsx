import { Explanations } from "./shared/Explanations";
import { FormEventHandler, useState } from "react";
import { fetchApi } from "../../func/api";
import { GameId } from "../../types";
import { useGameContext } from "../GameContextProvider";
import { PlayernameForm } from "./shared/PlayernameForm";
import { replaceQueryParams } from "../../func/url";
import { QueryParams } from "../../constants";

export function HomeScreen() {
  const { connect } = useGameContext();
  const [loading, setLoading] = useState(false);
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const name = form.get(QueryParams.Name)?.toString() || "";
    if (!name) {
      alert("Vous devez choisir un pseudo");
    }
    setLoading(true);
    const { gameId } = await fetchApi<{ gameId: GameId }>("/api/games", {
      method: "POST",
    });
    connect(gameId, name);
    replaceQueryParams({
      [QueryParams.GameId]: gameId,
      [QueryParams.Name]: name,
    });
  };
  return (
    <div className="container layout-base">
      <Explanations />
      <div>
        <PlayernameForm
          onSubmit={onSubmit}
          loading={loading}
          label="Créer une partie"
        />
      </div>
    </div>
  );
}
