import type { FormEventHandler, ReactNode } from "react";
import { Button } from "../ui/Button";

type Props = {
  onSubmit: FormEventHandler;
  loading: boolean;
  label: string;
};

export function PlayernameForm({ onSubmit, loading, label }: Props) {
  return (
    <form className="stack" onSubmit={onSubmit} style={{ gridArea: "input" }}>
      <div className="card guess-form">
        <input
          name="name"
          type="text"
          placeholder="Votre pseudo"
          required
          disabled={loading}
        />
      </div>
      <Button full disabled={loading}>
        {label}
      </Button>
    </form>
  );
}
