import type { FormEventHandler } from "react";
import { Button } from "./ui/Button";

type GuessFormProps = {
  onSubmit: FormEventHandler;
};

export function GuessForm({ onSubmit }: GuessFormProps) {
  return (
    <form
      className="card guess-form"
      style={{ gridArea: "input" }}
      action=""
      onSubmit={onSubmit}
    >
      <input name="word" type="text" placeholder="Entrez votre mot" />
      <Button>Deviner</Button>
    </form>
  );
}
