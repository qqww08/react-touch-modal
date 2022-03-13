import styled from "styled-components";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import useScrollHidden from "./hooks/useScrollHidden";
import {
  directionTransform,
  directionValue,
  endCompare,
  limitCompare,
  offset,
  scrollKeys,
  translateKey,
  translateValue,
} from "../variable";
import Portal from "./Portal";

type TDirection = "left" | "right" | "bottom" | "top";
interface StyledProps {
  visible?: boolean;
  styledDirection?: object;
  direction?: string;
  transform?: any;
  full?: boolean;
}
interface Props {
  direction: TDirection;
  visible: boolean;
  onToggle: () => void;
  children: ReactNode | string;
  full?: boolean;
  isTouch?: boolean;
}

const Drawer = (props: Props) => {
  const { visible, onToggle, children, direction, full, isTouch = true } = props;
  useScrollHidden();

  const [show, setShow] = useState(visible);
  const drawerRef = useRef<HTMLDivElement>(null);

  const handleShowClick = () => {
    setShow(false);
    setTimeout(() => {
      onToggle();
    }, 0);
  };

  useEffect(() => {
    let clientY = 0;
    let moveClientY = 0;
    const touchStart = (e) => {
      clientY = e.touches[0][scrollKeys[direction]];
    };
    const touchmove = (e) => {
      moveClientY = e.touches[0][scrollKeys[direction]] - clientY;
      if (limitCompare[direction](moveClientY)) return;

      if (drawerRef.current) {
        drawerRef.current.style.transform = `${translateKey[direction]}(${moveClientY}px)`;
        drawerRef.current.style.transition = `none 0s`;
      }
    };

    const touchend = () => {
      if (drawerRef.current) {
        const movePoint = drawerRef.current[offset[direction]] - moveClientY;
        if (endCompare[direction](moveClientY, movePoint)) {
          drawerRef.current.style.transform = `${translateKey[direction]}(${translateValue[direction]}px)`;
          drawerRef.current.style.transition = `300ms all`;
          return handleShowClick();
        }
        clientY = 0;
        moveClientY = 0;
        drawerRef.current.style.transform = `none`;
        drawerRef.current.style.transition = `300ms all`;
      }
    };
    if (drawerRef.current && isTouch) {
      drawerRef.current.addEventListener("touchstart", touchStart, false);
      drawerRef.current.addEventListener("touchmove", touchmove, false);
      drawerRef.current.addEventListener("touchend", touchend, false);
    }
    return () => {
      drawerRef.current?.removeEventListener("touchstart", touchStart, false);
      drawerRef.current?.removeEventListener("touchmove", touchmove, false);
      drawerRef.current?.removeEventListener("touchend", touchend, false);
    };
  }, [visible]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <Portal>
      {visible && (
        <__Wrapper>
          <__Back onClick={handleShowClick} visible={show} />
          <__Drawer
            ref={drawerRef}
            id={"drawer"}
            visible={show}
            transform={directionTransform[direction]}
            direction={direction}
            full={full}
          >
            {children}
          </__Drawer>
        </__Wrapper>
      )}
    </Portal>
  );
};

export default Drawer;

const __Back = styled.div<StyledProps>`
  transition: opacity 500ms;
  ${(props) => (props.visible ? { opacity: 1 } : { opacity: 0 })}
  width: 100%;
  flex: 1;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
`;

const __Wrapper = styled.div``;

const __Drawer = styled.div<StyledProps>`
  ${(props) => directionValue[props.direction as string]};
  ${(props) => (props.visible ? props.transform[0] : props.transform[1])};
  ${(props) => props.full && { width: "100%", height: "100%" }}
  transition: transform 500ms;
  background: #fff;
  position: absolute;
  z-index: 90;
`;
