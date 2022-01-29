import { ReactNode } from "react";

type ExplanationsProps = {
  title?: string;
  children?: ReactNode;
  gameLink?: boolean;
};

export function Explanations({
  title,
  children,
  gameLink = true,
}: ExplanationsProps) {
  return (
    <div className="card padded text-center">
      <h2 style={{ marginBottom: ".5em" }}>
        {title ?? "Bienvenue sur Shaper"}
      </h2>
      <p className="mb">
        Le but du jeu est de faire deviner aux autres joueurs un{" "}
        <span className="word">mot</span> mais vous n'avez droit qu'à{" "}
        <mark>15 traits</mark> !
      </p>
      <p className="mb-1">
        Ceci est un projet à but pédagogique, il est inspiré du jeu{" "}
        <a href="https://www.gigamic.com/jeu/kontour">Kontour</a>, si vous aimez
        le jeu n'hésitez pas à l'acheter !
      </p>
      {gameLink && (
        <div className="flex middle">
          <a href="https://www.gigamic.com/jeu/kontour">
            <img
              className="image"
              width={200}
              height={272}
              src="/img/kontour-box.webp"
              alt=""
            />
          </a>
        </div>
      )}
      {children}
    </div>
  );
}
