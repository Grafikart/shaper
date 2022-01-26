import type { FormEventHandler, ReactNode } from "react";
import { Explanations } from "./shared/Explanations";
import { canReady, canStartGame } from "../../machine/guards";
import { GameModel } from "../../machine/GameModel";
import { Button } from "./ui/Button";
import { PlayernameForm } from "./shared/PlayernameForm";
import { useState } from "react";
import { replaceQueryParams, urlSearchParams } from "../../func/url";
import { useGameContext } from "../GameContextProvider";
import { QueryParams } from "../../constants";
import { GameId } from "../../types";

export function JoinGameScreen() {
  const { connect } = useGameContext();
  const searchParams = urlSearchParams();
  const [loading, setLoading] = useState(false);
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = new FormData(e.target as HTMLFormElement).get("name");
    if (typeof name === "string") {
      connect(searchParams.get(QueryParams.GameId)!.toString() as GameId, name);
      replaceQueryParams({ name });
    } else {
      alert("Pseudo invalide");
    }
  };
  return (
    <div className="container layout-base">
      <Explanations title="Vous avez été invité à rejoindre une partie" />
      <div>
        <PlayernameForm
          onSubmit={onSubmit}
          loading={loading}
          label="Rejoindre la partie"
        />
      </div>
    </div>
  );
}
