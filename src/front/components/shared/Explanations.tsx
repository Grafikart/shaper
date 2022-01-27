import { ReactNode } from "react";

type ExplanationsProps = {
  title?: string;
  children?: ReactNode;
};

export function Explanations({ title, children }: ExplanationsProps) {
  return (
    <div className="card padded text-center">
      <h2 style={{ marginBottom: ".5em" }}>
        {title ?? "Bienvenue sur shaper"}
      </h2>
      <p>
        Le but du jeu est de faire deviner aux autres joueur un{" "}
        <span className="word">mot</span>
        <br />
        mais vous n'avez pas le droit qu'à <mark>15 traits</mark> !
      </p>
      {children}
    </div>
  );
}
