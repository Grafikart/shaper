import { Explanations } from "./shared/Explanations";
import { PlayernameForm } from "./shared/PlayernameForm";
import { useChooseName } from "../../hooks/useChooseName";

export function HomeScreen() {
  const { loading, chooseName } = useChooseName();
  return (
    <div className="container layout-base">
      <Explanations />
      <div>
        <PlayernameForm
          onSubmit={chooseName}
          loading={loading}
          label="Créer une partie"
        />
      </div>
    </div>
  );
}
