
![화면 기록 2022-01-21 오후 10 20 59](https://user-images.githubusercontent.com/62181345/150534763-4553b5ba-059a-48c4-ab00-0758a0fd998e.gif)


* [Getting Started](#getting-started)
* [Basic Usage](#basic-usage)
* [Props](#props)
* [Classnames](#classnames)
* [License](#license)

## Getting Started

You can install the module via `npm` or `yarn`:

```sh
npm install react-touch-modal --save
```

### Description
touch drawer

### Basic Usage

```js
import React from "react";
import Drawer from "react-touch-modal";

const Example = () => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Drawer direction={"right"} visible={isVisible} onToggle={() => setIsVisible(prev=>!prev)}>
      TEST
    </Drawer>,
  )
}


```

## Props

| Prop           | Type       | Required? | Default Value | Description                                                                                                                               |
| -------------- | ---------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| visible        | `boolean`  | Required  | -             |   사용여부                                                                                                             |
| onToggle        | `function` | Required  | -             |  toggle function                     |
| direction     | `left or right or top or bottom`  | Required  | -       | drawer 나오는 방향                |
| full     | `boolean`  | Optional  | `false`   | modal full screen |
| isTouch  | `boolean`  | Optional  | `true`   | touch 여부 |

## License
MIT

