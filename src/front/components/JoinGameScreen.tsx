import { Explanations } from "./shared/Explanations";
import { PlayernameForm } from "./shared/PlayernameForm";
import { useChooseName } from "../../hooks/useChooseName";

export function JoinGameScreen() {
  const { loading, chooseName } = useChooseName();
  return (
    <div className="container layout-base">
      <Explanations title="Vous avez été invité à rejoindre une partie" />
      <div>
        <PlayernameForm
          onSubmit={chooseName}
          loading={loading}
          label="Rejoindre la partie"
        />
      </div>
    </div>
  );
}
