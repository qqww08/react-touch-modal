import { createPortal } from "react-dom";
import { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  visible: boolean;
  children: ReactNode;
}
const Portal = ({ children, visible }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted && visible && ref.current) {
      const el = document.createElement("div");
      el.setAttribute("id", "touch-drawer");
      document.body.appendChild(el);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ref.current = document.querySelector("#touch-drawer") as HTMLDivElement;
    }
    setMounted(true);
  }, [visible, mounted, ref]);

  return ref.current ? createPortal(children, ref.current as any) : null;
};

export default Portal;
