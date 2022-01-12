import React from "react";
import ReactDOM from "react-dom";
import ReactKeypad from "./lib/ReactKeypad";

ReactDOM.render(
  <ReactKeypad
    isVisible
    onClose={() => null}
    emptyPassword={false}
    onPassConfirm={(password) => console.log(password)}
    onFinish={(password) => console.log(password)}
  />,
  document.getElementById("root")
);
