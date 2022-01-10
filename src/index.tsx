import React from "react";
import ReactDOM from "react-dom";
import ReactKeypad from "./lib/ReactKeypad";

ReactDOM.render(
  <ReactKeypad
    isVisible
    shuffle={"once"}
    onClose={() => null}
    onFinish={(password) => console.log(password)}
  />,
  document.getElementById("root")
);
