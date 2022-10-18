<br/>
<h2 align="center">React useHoverIntent</h2>
<br/>

<p align="center">
  <a aria-label="Downloads" href="https://github.com/natelindev/react-use-hoverintent/">
    <img alt="Downloads" src="https://img.shields.io/npm/dt/react-use-hoverintent?style=for-the-badge">
  </a>
  <a aria-label="License" href="https://github.com/natelindev/react-use-hoverintent/blob/master/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/natelindev/vlepo?style=for-the-badge">
  </a>
</p>

react-use-hoverintent is a react hook which allows you to use classic hoverintent behavior in modern, react way.

"hoverIntent is a plug-in that attempts to determine the user's intent... like a crystal ball, only with mouse movement! It is similar to jQuery's hover method. However, instead of calling the handlerIn function immediately, hoverIntent waits until the user's mouse slows down enough before making the call."

Built with typescript, with official typing, with zero dependency, transpiled to es5.

Inspired by [jquery-hoverintent](https://github.com/briancherne/jquery-hoverIntent) [react-hoverintent](https://www.npmjs.com/package/react-hoverintent)

## Installation

```bash
yarn add react-use-hoverintent
```

or

```bash
npm install react-use-hoverintent
```

## Options

`ref`: the react element ref which you want hoverintent to be applied.

`timeout` : A simple delay, in milliseconds, before the `onMouseOut` callback is fired. If the user mouses back over the element before the timeout has expired the `onMouseOut` callback will not be called (nor will the `onMouseOver` callback be called). This is primarily to protect against sloppy/human mousing trajectories that temporarily (and unintentionally) take the user off of the target element... giving them time to return.

Default `timeout: 0`

`sensitivity` : If the mouse travels fewer than this number of pixels between polling intervals, then the `onMouseOver` callback will be called. With the minimum sensitivity threshold of 1, the mouse must not move between polling intervals. With higher sensitivity thresholds you are more likely to receive a false positive.

Default `sensitivity: 6`

`interval` : The number of milliseconds hoverIntent waits between reading/comparing mouse coordinates. When the user's mouse first enters the element its coordinates are recorded. The soonest the `onMouseOut` callback can be called is after a single polling interval. Setting the polling interval higher will increase the delay before the first possible `onMouseOver` call, but also increases the time to the next point of comparison.

Default `interval: 100`

## Usage

Basic usage

```javascript
import React from "react";
import { useHoverIntent } from "react-use-hoverintent";

export const MyFunctionalComponent = (props) => {
  const [isHovering, intentRef, setIsHovering] = useHoverIntent();
  return <div ref={intentRef} className={`${isHovering ? "hover" : ""}`}></div>;
};
```

With options

```javascript
import React from "react";
import { useHoverIntent } from "react-use-hoverintent";

export const MyFunctionalComponent = (props) => {
  const [isHovering, intentRef, setIsHovering] = useHoverIntent({
    timeout: 100,
    sensitivity: 10,
    interval: 200,
  });
  return <div ref={intentRef} className={`${isHovering ? "hover" : ""}`} />;
};
```

With ForwardRef

```js
import React from "react";
import { useHoverIntent } from "react-use-hoverintent";

export const MyFunctionalComponent = React.forwardRef((props, ref) => {
  const [isHovering, intentRef, setIsHovering] = useHoverIntent({ ref });
  return <div ref={intentRef} className={`${isHovering ? "hover" : ""}`} />;
});
```

With Custom UI lib

Check if they have `innerRef` prop or forwarded ref

```javascript
import React from "react";
import { useHoverIntent } from "react-use-hoverintent";

export const MyFunctionalComponent = (props) => {
  const [isHovering, intentRef, setIsHovering] = useHoverIntent();
  return (
    <Card
      innerRef={intentRef}
      className={`${isHovering ? "hover" : ""}`}
    ></Card>
  );
};
```

After v1.2.9

With custom hover state control

```javascript
import React, { useCallback } from "react";
import { useHoverIntent } from "react-use-hoverintent";

export const MyFunctionalComponent = (props) => {
  const [isHovering, intentRef, setIsHovering] = useHoverIntent();

  const mouseOverHandler = useCallback(() => {
    () => setIsHovering(true);
  }, [setIsHovering]);

  const mouseOutHandler = useCallback(() => {
    () => setIsHovering(false);
  }, [setIsHovering]);

  return (
    <>
      <div ref={intentRef} className={`${isHovering ? "hover" : ""}`} />
      <textarea onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} />
    </>
  );
};
```

## License

MIT
