import Drawer from "react-bottom-drawer";
import styled from "styled-components";
import React from "react";
import {Keypad} from "./components";

interface Props {
    onClose: () => void;
    isVisible: boolean;
    count?: 4 | 5 | 6;
    onFinish: (password: string) => void;
    message?: string;
    error?: string;
    className?: string
    shuffle?: boolean
}

const ReactKeypad = (props: Props) => {
    const {onClose, isVisible, className = "react-keypad", ...rest} = props;

    return (
        <__Wrapper>
            <Drawer
                duration={400}
                hideScrollbars
                onClose={onClose}
                isVisible={isVisible}
                className="password-drawer"
            >
                <Keypad {...rest} className={className}/>
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
