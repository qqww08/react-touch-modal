import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { IKeypad } from "../types";
import useShuffle from "../hooks/useShuffle";
import { defaultMessage } from "../utils";

const Keypad = (props: IKeypad) => {
  const {
    onFinish,
    onPassConfirm,
    emptyPassword = false,
    count = 6,
    className = "password",
    shuffle = "fixed",
    messages = defaultMessage,
    error = "",
    deleteIcon = "삭제",
    deleteAllIcon = "전체삭제",
  } = props;

  const [msg, setMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState(error);
  const [keyData, setKeyData] = useState<string[]>([...Array(count).map((item) => item)]);
  const [password, setPassword] = useState<any>([]);

  const keyNumber = useShuffle({ shuffle, keyData });
  const keyValueLength = useMemo(() => keyData.join("").length, [keyData]);
  const keyValue = useMemo(() => keyData.join(""), [keyData]);
  const keyFinish = useMemo(() => keyValueLength === count, [keyValueLength, count]);

  const handleFullCut = useCallback(
    () => setKeyData([...Array(count).map((item) => item)]),
    [keyData]
  );

  const handleDelete = useCallback(() => {
    keyData.splice(keyValueLength - 1, 1, "");
    setKeyData([...keyData]);
  }, [keyData, keyValueLength]);

  //keypad click func
  const handleClick = useCallback(
    (value: string) => {
      if (errorMsg) {
        setErrorMsg("");
      }
      const keyValue = keyData;
      keyValue.splice(keyValueLength, 1, value);
      setKeyData([...keyValue]);
    },
    [keyData, keyValueLength, errorMsg]
  );

  useEffect(() => {
    switch (true) {
      case password.length === 2:
        if (onPassConfirm) {
          setMsg(messages[1]);
          onPassConfirm(password);
          setKeyData([...Array(count).map((item) => item)]);
        }
        break;
      case keyFinish && emptyPassword && password.length < 2:
        setMsg(messages[2]);
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
    if (error) {
      setErrorMsg(error);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      setKeyData([...Array(count).map((item) => item)]);
      setMsg(messages[0]);
    };
  }, []);

  return (
    <__Container className={`${className}-container`}>
      <__Message className={`${className}-message`}>{msg}</__Message>
      <__ErrorMessage className={`${className}-error`}>{errorMsg}</__ErrorMessage>
      <__BulletWrapper className={`${className}-bullet`}>
        {keyData?.map((item, index) => (
          <__Bullet key={index} activeColor={item} />
        ))}
      </__BulletWrapper>

      <__PasswordWrapper className={`${className}-button-wrapper`}>
        {keyNumber?.map((item, index) => {
          switch (index) {
            case 9:
              return (
                <React.Fragment key={index}>
                  <__KeyPad className={`${className}-button`} onClick={handleFullCut}>
                    {deleteAllIcon}
                  </__KeyPad>
                  <__KeyPad className={`${className}-button`} onClick={() => handleClick(item)}>
                    {item}
                  </__KeyPad>
                  <__KeyPad className={`${className}-button`} onClick={handleDelete}>
                    {deleteIcon}
                  </__KeyPad>
                </React.Fragment>
              );
            default:
              return (
                <__KeyPad
                  key={index}
                  className={`${className}-button`}
                  onClick={() => handleClick(item)}
                >
                  {item}
                </__KeyPad>
              );
          }
        })}
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
const __ErrorMessage = styled.p`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
`;
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
  margin-bottom: 100px;
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
