import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const el = document.createElement("div");
  el.setAttribute("id", "touch-drawer");
  document.body.appendChild(el);
  return createPortal(children, el);
};

export default Portal;
