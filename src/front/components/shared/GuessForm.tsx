import type { FormEventHandler } from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/Button";

type GuessFormProps = {
  onSubmit: (s: string) => void;
  delay: number; // Delay between user submissions
};

export function GuessForm({ onSubmit, delay }: GuessFormProps) {
  const timerRef = useRef<number | undefined>(undefined);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const word = new FormData(form).get("word")?.toString() || "";
    if (word.length > 0) {
      setDisabled(true);
      onSubmit(word);
      form.reset();
      timerRef.current = window.setTimeout(() => {
        setDisabled(false);
      }, delay * 1000);
    }
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return (
    <form
      className="card guess-form"
      style={{ gridArea: "input" }}
      action=""
      onSubmit={handleSubmit}
    >
      <input
        autoFocus
        disabled={disabled}
        name="word"
        type="text"
        placeholder="Entrez votre mot"
      />
      <Button disabled={disabled}>Deviner</Button>
    </form>
  );
}
