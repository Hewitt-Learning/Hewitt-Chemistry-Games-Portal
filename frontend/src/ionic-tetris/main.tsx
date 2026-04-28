import { render } from "preact";
import { subscribeToTheme } from "../theme";
import { App } from "./app";
import "./index.css";

render(<App />, document.getElementById("app") as HTMLElement);

subscribeToTheme((theme) => {
  for (const className of document.body.classList.values()) {
    if (className.startsWith("theme-"))
      document.body.classList.remove(className);
  }
  document.body.classList.add(`theme-${theme}`);
});
