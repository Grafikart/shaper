import ReactDOM from "react-dom";
import { App } from "./App";
import { GameContextProvider } from "./GameContextProvider";
import "../css/style.css";

ReactDOM.render(
  <GameContextProvider>
    <App />
  </GameContextProvider>,
  document.getElementById("app")
);
