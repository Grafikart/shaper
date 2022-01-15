import ReactDOM from "react-dom";
import { App } from "./App";
import { GameContextProvider } from "./GameContextProvider";

ReactDOM.render(
  <GameContextProvider>
    <App />
  </GameContextProvider>,
  document.getElementById("app")
);
