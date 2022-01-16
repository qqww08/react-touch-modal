import React from "react";
import ReactDOM from "react-dom";
import ReactKeypad from "./lib/ReactKeypad";

ReactDOM.render(
  <ReactKeypad onClose={() => null} isVisible onFinish={(pass) => console.log(pass)} />,
  document.getElementById("root")
);
