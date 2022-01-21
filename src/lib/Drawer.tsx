import styled from "styled-components";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import useScrollHidden from "../hooks/useScrollHidden";
import {
  directionTransform,
  directionValue,
  drawerValue,
  endCompare,
  limitCompare,
  offset,
  scrollKeys,
  translateKey,
  translateValue,
} from "../variable";

type TDirection = "left" | "right" | "bottom" | "top";
interface StyledProps {
  visible?: boolean;
  styledDirection?: object;
  direction?: any;
  transform?: any;
  full?: boolean;
}
interface Props {
  direction: TDirection;
  visible: boolean;
  onToggle: () => void;
  children: ReactNode;
  full?: boolean;
}

const Drawer = (props: Props) => {
  const { visible, onToggle, children, direction, full } = props;
  useScrollHidden();

  const [show, setShow] = useState(visible);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleShowClick = () => {
    setShow(false);
    setTimeout(() => {
      onToggle();
    }, 500);
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
    if (buttonRef.current) {
      buttonRef.current.addEventListener("touchstart", touchStart, false);
      buttonRef.current.addEventListener("touchmove", touchmove, false);
      buttonRef.current.addEventListener("touchend", touchend, false);
    }
    return () => {
      buttonRef.current?.removeEventListener("touchstart", touchStart, false);
      buttonRef.current?.removeEventListener("touchmove", touchmove, false);
      buttonRef.current?.removeEventListener("touchend", touchend, false);
    };
  }, [visible]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <>
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
            <__Header ref={buttonRef} direction={direction}>
              {/*  <__Bar />*/}
            </__Header>
            {children}
          </__Drawer>
        </__Wrapper>
      )}
    </>
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
const __Header = styled.div<StyledProps>`
  ${(props) => drawerValue[props.direction]};
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const __Drawer = styled.div<StyledProps>`
  ${(props) => directionValue[props.direction]};
  transition: transform 500ms;
  ${(props) => (props.visible ? props.transform[0] : props.transform[1])};
  background: #eee;
  ${(props) => props.full && { width: "100%", height: "100%" }}
  position: absolute;
  z-index: 90;
`;
