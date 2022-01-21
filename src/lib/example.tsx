import React, { useState } from "react";
import Drawer from "./Drawer";

const Example = () => {
  const [isVisible, setIsVisible] = useState("");
  const handleClick = (v) => {
    setIsVisible(v);
  };
  return (
    <div>
      <button onClick={() => handleClick("left")}>Left</button>
      <button onClick={() => handleClick("right")} type={"button"}>
        Right
      </button>
      <button onClick={() => handleClick("bottom")} type={"button"}>
        Bottom
      </button>
      <button onClick={() => handleClick("top")} type={"button"}>
        Top
      </button>
      <Drawer direction={"left"} visible={isVisible === "left"} onToggle={() => setIsVisible("")}>
        React-Touch-Drawer
      </Drawer>
      <Drawer direction={"right"} visible={isVisible === "right"} onToggle={() => setIsVisible("")}>
        React-Touch-Drawer
      </Drawer>
      <Drawer direction={"top"} visible={isVisible === "top"} onToggle={() => setIsVisible("")}>
        React-Touch-Drawer
      </Drawer>
      <Drawer
        direction={"bottom"}
        visible={isVisible === "bottom"}
        onToggle={() => setIsVisible("")}
      >
        React-Touch-Drawer
      </Drawer>
    </div>
  );
};

export default Example;
