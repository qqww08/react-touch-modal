import React, {useEffect, useState} from "react"
import styled from "styled-components";
import {keyValue, shuffleHandler} from "../utils";


interface Props {
    onFinish: (password: string) => void
    count?: 4 | 5 | 6;
    className?: string
    shuffle?: boolean
    message?: string
}

const Keypad = (props: Props) => {
    const {onFinish, className, shuffle = false, count = 6, message = "패스워드를 입력 해주세요."} = props
    const [keyData, setKeyData] = useState<number[] | null>([...Array(count).map(item => item)])

    useEffect(() => {
        onFinish("123")
        return () => {
            setKeyData([...Array(count).map(item => item)])
        }
    }, [])

    return (
        <__Container className={`${className}-container`}>
            <__Message>{message}</__Message>
            <__BulletWrapper className={`${className}-bullet`}>
                {keyData?.map((item, index) => <__Bullet key={index}>{item}</__Bullet>)}
            </__BulletWrapper>
            <__PasswordWrapper className={`${className}-button-wrapper`}>
                {shuffleHandler(keyValue, shuffle).map((item, index) => <__KeyPad key={index}
                                                                                  className={`${className}-button`}>{item}</__KeyPad>)}
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
`;
const __Bullet = styled.li`
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background: #a6a6a6;
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