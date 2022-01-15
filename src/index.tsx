import React from "react";
import ReactDOM from "react-dom";
import ReactKeypad from "./ReactKeypad";

ReactDOM.render(
  <ReactKeypad
    isVisible
    emptyPassword={false}
    onClose={() => null}
    className={"password"}
    onFinish={(password) => console.log(password)}
    onPassConfirm={(pass) => console.log(pass)}
  />,
  document.getElementById("root")
);
