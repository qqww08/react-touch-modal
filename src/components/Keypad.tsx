import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { IKeypad } from "../types";
import useShuffle from "../hooks/useShuffle";
import { defaultMessage } from "../utils";

const Keypad = (props: IKeypad) => {
  const {
    onFinish,
    onPassConfirm,
    emptyPassword,
    count = 6,
    className = "react-keypad",
    shuffle = "fixed",
    messages = defaultMessage,
    error = "",
  } = props;

  const [msg, setMsg] = useState<string>("");
  const [keyData, setKeyData] = useState<string[]>([...Array(count).map((item) => item)]);
  const [password, setPassword] = useState<any>([]);

  const keyNumber = useShuffle({ shuffle, keyData });
  const keyValueLength = useMemo(() => keyData.join("").length, [keyData]);
  const keyValue = useMemo(() => keyData.join(""), [keyData]);
  const keyFinish = useMemo(() => keyValueLength === count, [keyValueLength, count]);

  //keypad click func
  const handleClick = useCallback(
    (value: string) => {
      const keyValue = keyData;
      keyValue.splice(keyValueLength, 1, value);
      setKeyData([...keyValue]);
    },
    [keyData, keyValueLength]
  );

  useEffect(() => {
    switch (true) {
      case password.length === 2:
        if (onPassConfirm) {
          onPassConfirm(password);
        }
        break;
      case keyFinish && emptyPassword && password.length < 2:
        setKeyData([...Array(count).map((item) => item)]);
        setPassword((prev) => [...prev, keyValue]);
        break;
      case keyFinish:
        setKeyData([...Array(count).map((item) => item)]);
        onFinish(keyValue);
        break;
      default:
        break;
    }
  }, [keyValueLength]);

  useEffect(() => {
    if (emptyPassword) {
      setMsg(messages[1]);
    } else {
      setMsg(messages[0]);
    }
  }, [emptyPassword]);

  useEffect(() => {
    return () => {
      setKeyData([...Array(count).map((item) => item)]);
    };
  }, []);

  return (
    <__Container className={`${className}-container`}>
      <__Message className={`${className}-message`}>{msg}</__Message>
      <__ErrorMessage className={`${className}-error`}>{error}</__ErrorMessage>
      <__BulletWrapper className={`${className}-bullet`}>
        {keyData?.map((item, index) => (
          <__Bullet key={index} activeColor={item} />
        ))}
      </__BulletWrapper>

      <__PasswordWrapper className={`${className}-button-wrapper`}>
        {keyNumber.map((item, index) => (
          <__KeyPad key={index} className={`${className}-button`} onClick={() => handleClick(item)}>
            {item}
          </__KeyPad>
        ))}
      </__PasswordWrapper>
    </__Container>
  );
};

export default Keypad;

const __Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4vh 0;
`;
const __BulletWrapper = styled.ul`
  width: 60%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style-type: none;
  margin-top: 0;
`;
const __ErrorMessage = styled.p``;
const __Bullet = styled.li<{ activeColor: string }>`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: ${(props) => (props.activeColor ? "#000000" : "#a6a6a6")};
`;
const __PasswordWrapper = styled.div`
  width: 100%;
`;
const __Message = styled.p`
  text-align: center;
`;
const __KeyPad = styled.button`
  text-transform: none;
  overflow: visible;
  font-family: inherit; /* 1 */
  font-size: 100%; /* 1 */
  line-height: 1.15; /* 1 */
  outline: 0;
  margin: 0; /* 2 */
  border-style: none;
  background: #fff;
  -webkit-appearance: button;
  cursor: pointer;
  width: 33.3%;
  padding: 15px 0;

  &:active {
    background: rgba(0, 0, 0, 0.1);
  }
`;
