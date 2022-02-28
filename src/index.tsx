import React from "react";
import ReactDOM from "react-dom";
import Drawer from "./lib/Drawer";

ReactDOM.render(
  <Drawer direction={"right"} visible onToggle={() => console.log("toggle")}>
    TEST
  </Drawer>,
  document.getElementById("root")
);
