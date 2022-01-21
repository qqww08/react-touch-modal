import styled from "styled-components";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface StyledProps {
  visible: boolean;
  scrollY?: number;
}
interface Props {
  direction: "left" | "right" | "bottom" | "top";
  visible: boolean;
  onToggle: () => void;
  children: ReactNode;
}
const Drawer = (props: Props) => {
  const { visible, onToggle, children } = props;

  const [show, setShow] = useState(visible);
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleShowClick = () => {
    setShow(false);
    setTimeout(() => {
      onToggle();
    }, 500);
  };

  useEffect(() => {
    let clientY = 0;
    let moveClientY = 0;
    if (buttonRef.current) {
      buttonRef.current.addEventListener(
        "touchstart",
        (e) => {
          clientY = e.touches[0].clientY;
        },
        false
      );
      buttonRef.current.addEventListener(
        "touchmove",
        (e) => {
          moveClientY = e.touches[0].clientY - clientY;
          if (moveClientY < 0) return;

          if (drawerRef.current) {
            drawerRef.current.style.transform = `translateY(${moveClientY}px)`;
            drawerRef.current.style.transition = `none 0s`;
          }
        },
        false
      );
      buttonRef.current.addEventListener(
        "touchend",
        () => {
          if (drawerRef.current) {
            if (moveClientY > drawerRef.current.offsetHeight - moveClientY) {
              drawerRef.current.style.transform = `translateY(${2000}px)`;
              drawerRef.current.style.transition = `500ms all`;
              return handleShowClick();
            }
            clientY = 0;
            moveClientY = 0;
            drawerRef.current.style.transform = `none`;
            drawerRef.current.style.transition = `300ms all`;
          }
        },
        false
      );
    }
  }, [buttonRef, visible]);

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <>
      {visible && (
        <__Wrapper>
          <__Back onClick={handleShowClick} visible={show} />
          <__Drawer ref={drawerRef} id={"drawer"} visible={show} scrollY={scrollY}>
            <__Header ref={buttonRef}>
              <__Bar />
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
const __Header = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const __Bar = styled.div`
  border-radius: 15px;
  width: 15vw;
  height: 1.5vw;
  background: #a1a1a1;
`;
const __Drawer = styled.div<StyledProps>`
  border-radius: 15px 15px 0 0;
  transition: transform 500ms;
  ${(props) =>
    props.visible ? { transform: `translateY(0)` } : { transform: "translateY(2000px)" }};
  background: #eee;
  width: 100%;
  height: 70vh;
  position: absolute;
  z-index: 90;
  bottom: 0;
  left: 0;
`;
