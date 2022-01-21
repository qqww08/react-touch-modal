import React, { useState } from "react";
import Drawer from "./Drawer";

const Render = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible((prev) => !prev)}>aaaa</button>
      <Drawer
        direction={"bottom"}
        visible={isVisible}
        onToggle={() => setIsVisible((prev) => !prev)}
      >
        a
      </Drawer>
    </div>
  );
};

export default Render;
