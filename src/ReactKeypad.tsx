import Drawer from "react-bottom-drawer";
import styled from "styled-components";
import React from "react";
import { IKeypad } from "./types";
import Keypad from "./lib/Keypad";

interface Props extends IKeypad {
  onClose: () => void;
  isVisible: boolean;
}

const ReactKeypad = (props: Props) => {
  const { onClose, isVisible, ...rest } = props;

  return (
    <__Wrapper>
      <Drawer
        duration={400}
        hideScrollbars
        onClose={onClose}
        isVisible={isVisible}
        className="password-drawer"
      >
        <Keypad {...rest} />
      </Drawer>
    </__Wrapper>
  );
};

export default ReactKeypad;
const __Wrapper = styled.section`
  .password-drawer__backdrop {
    z-index: 100;
  }

  .password-drawer {
    flex: 1;
    z-index: 110;
  }

  .password-drawer__content {
    padding: 0 !important;
    height: 100% !important;
    max-height: none !important;
  }

  .password-drawer__handle-wrapper {
    z-index: 110 !important;
    width: 100% !important;
    padding: 10px 0 15vw !important;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;
