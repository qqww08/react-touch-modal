import React from "react"
import ReactDOM from "react-dom";
import ReactKeypad from "./ReactKeypad";


ReactDOM.render(
    <ReactKeypad isVisible shuffle onClose={() => null} onFinish={(password)=>console.log(password)}/>,
    document.getElementById('root')
);

