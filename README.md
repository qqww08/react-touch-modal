![da2b8967-2dbe-455b-a07e-1dafb2bf6941](https://user-images.githubusercontent.com/62181345/149617448-d98c2f8f-3a75-4371-8eca-eca5b3819df1.gif)

* [Getting Started](#getting-started)
* [Basic Usage](#basic-usage)
* [Props](#props)
* [Classnames](#classnames)
* [License](#license)

## Getting Started

You can install the module via `npm` or `yarn`:

```sh
npm install react-number-keypad --save
```

```sh
yarn add react-number-keypad
```

### Description
사용하기 쉬운 PIN 번호 입력 컴포넌트 

### Basic Usage

```js
import React from "react";
import ReactDOM from "react-dom";
import Drawer from "react-number-keypad";

ReactDOM.render(
    <Drawer
        isVisible
        emptyPassword={false}
        onClose={() => null}
        className={"password"}
        onFinish={(password) => console.log(password)}
        onPassConfirm={(pass) => console.log(pass)}
        shuffle={"always"}
    />,
    document.getElementById("root")
);


```

## Props

| Prop           | Type       | Required? | Default Value | Description                                                                                                                               |
| -------------- | ---------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| isVisible      | `boolean`  | Required  | -             |   사용여부                                                                                                             |
| onClose        | `function` | Required  | -             |                         |
| onFinish       | `function` | Required  | -             |   패스워드 입력 callback func                               |
| count          | `number`   | Optional  | `6`           | 패스워드 입력 횟수       |
| emptyPassword  | `boolean`  | Optional  | `false`       | 패스워드 초기 설정 여부                |
| onPassConfirm  | `function` | Optional  | `true`        |   패스워드 초기 설정 callback func                  |
| className      | `string`   | Optional  | `password`    | classNames custom                    |
| shuffle        | `always or fixed or once`   | Optional  | `fixed`   |  keypad 순서, always 클릭 할때마다 변경, fixed 숫자 순서 고정, once 한번만 shuffle           |
| error          | `string`   | Optional  | -             | error message   |
| messages       | `array`   | Optional  | `  "패스워드를 입력 해주세요, 사용할 패스워드 설정 ,다시 한번 입력해 주세요.`   | message             |
| deleteAllIcon  | `string or React.ReactNode`   | Optional  | `전체삭제`   |  전체삭제|
| deleteIcon     | `string or React.ReactNode`  | Optional  | `삭제`   ||

## Classnames


```css

.password-container {

}

.password-message {

}

.password-error {

}

.password-bullet {

}

.password-button-wrapper{

}

.password-button{

}

```

## License
MIT

