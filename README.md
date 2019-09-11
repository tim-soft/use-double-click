# use-double-click

[![npm](https://img.shields.io/npm/v/use-double-click.svg?color=brightgreen&style=popout-square)](https://www.npmjs.com/package/use-double-click)
[![NPM](https://img.shields.io/github/license/tim-soft/use-double-click?color=brightgreen&style=popout-square)](https://github.com/tim-soft/use-double-click/blob/master/LICENSE)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/use-double-click.svg?style=popout-square)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=popout-square)
[![Codecov](https://img.shields.io/codecov/c/github/tim-soft/use-double-click?style=flat-square)](https://codecov.io/gh/tim-soft/use-double-click)
[![Travis (.org)](https://img.shields.io/travis/tim-soft/use-double-click?style=flat-square)](https://travis-ci.org/tim-soft/use-double-click)

use-double-click is a simple React hook for differentiating single and double clicks on the same component.

**Documentation** [https://timellenberger.com/libraries/use-double-click](https://timellenberger.com/libraries/use-double-click)

[Check out the demo on Codesandbox](https://codesandbox.io/s/use-double-click-f7e33?expanddevtools=1&fontsize=14)

## What's wrong with `onDoubleClick()`?

When you double click on an element, `onClick()` fires twice alongside your single `onDoubleClick()` callback. This effect isn't desirable when a single click and a double click have different functions!

`useDoubleClick()` waits within a latency window after a click for a secondary click, and only after this period either the `onSingleClick` or `onDoubleClick()` callback will fire a single time.

## Install

```bash
yarn add use-double-click
```

## Usage

```jsx
import { useRef } from 'react';
import useDoubleClick from 'use-double-click';

const Button = () => {
  const buttonRef = useRef();
  
  useDoubleClick({
    onSingleClick: e => {
      console.log(e, 'single click');
    },
    onDoubleClick: e => {
      console.log(e, 'double click');
    },
    ref: buttonRef,
    latency: 250
  });
  
  return <button ref={buttonRef}>Click Me</button>
}
```

## Props

| Prop                 | Description                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------- |
| onSingleClick        | A callback function for single click events              |
| onDoubleClick        | A callback function for double click events                                                             |
| ref                  | Dom node to watch for double clicks                                                                     |
| latency              | The amount of time (in milliseconds) to wait before differentiating a single from a double click        |

## License

MIT © [Tim Ellenberger](https://github.com/tim-soft)
