import styled from "styled-components";
import React, { useEffect, useRef } from "react";

const Drawer = () => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
          if (drawerRef.current) {
            drawerRef.current.style.transform = `translateY(${e.touches[0].clientY - clientY}px)`;
          }
        },
        false
      );
      buttonRef.current.addEventListener(
        "touchend",
        () => {
          if (drawerRef.current) {
            if (moveClientY > drawerRef.current.offsetHeight - moveClientY) {
              console.log("end");
            }

            drawerRef.current.style.transform = `none`;
          }
        },
        false
      );
    }
  }, [buttonRef]);
  return (
    <__Wrapper ref={drawerRef} id={"drawer"}>
      <__Button ref={buttonRef} />
    </__Wrapper>
  );
};

export default Drawer;
const __Button = styled.button`
  position: absolute;
  width: 100%;
  height: 30px;
  left: 50%;
  transform: translateX(-50%);
`;
const __Wrapper = styled.div`
  transition: all 50ms;
  background: #eee;
  width: 100%;
  height: 30vh;
  position: fixed;
  bottom: 0;
  left: 0;
`;
