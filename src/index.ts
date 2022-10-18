import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

interface optionType {
  ref?: React.Ref<HTMLElement | null>;
  sensitivity?: number;
  interval?: number;
  timeout?: number;
}

export const useHoverIntent = <T>(
  options?: optionType
): [
  boolean,
  React.RefObject<HTMLElement & T>,
  Dispatch<SetStateAction<boolean>>
] => {
  const { ref, sensitivity = 6, interval = 100, timeout = 0 } = options ?? {};
  const intentRef = useRef<HTMLElement & T>(null);
  const [isHovering, setIsHovering] = useState(false);

  let x = 0,
    y = 0,
    pX = 0,
    pY = 0,
    timer = 0;
  const delay = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
    }
    return setIsHovering(false);
  };
  const tracker = (e: MouseEvent) => {
    x = e.clientX;
    y = e.clientY;
  };
  const compare = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (Math.abs(pX - x) + Math.abs(pY - y) < sensitivity) {
      return setIsHovering(true);
    } else {
      pX = x;
      pY = y;
      timer = window.setTimeout(() => compare(e), interval);
    }
  };
  const dispatchOver = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (intentRef.current) {
      intentRef.current.removeEventListener("mousemove", tracker, false);
    }
    if (!isHovering) {
      pX = e.clientX;
      pY = e.clientY;
      if (intentRef.current) {
        intentRef.current.addEventListener("mousemove", tracker, false);
      }
      timer = window.setTimeout(() => compare(e), interval);
    }
  };
  const dispatchOut = (e: MouseEvent) => {
    if (timer) {
      clearTimeout(timer);
    }
    if (intentRef.current) {
      intentRef.current.removeEventListener("mousemove", tracker, false);
    }
    if (isHovering) {
      timer = window.setTimeout(() => delay(e), timeout);
    }
  };

  useEffect(() => {
    const currentRef = intentRef.current;
    if (currentRef) {
      currentRef.addEventListener("mouseover", dispatchOver, false);
      currentRef.addEventListener("mouseout", dispatchOut, false);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
      if (currentRef) {
        currentRef.removeEventListener("mouseover", dispatchOver, false);
        currentRef.removeEventListener("mouseout", dispatchOut, false);
      }
    };
  });

  useImperativeHandle(ref, () => intentRef.current, [intentRef]);

  return [isHovering, intentRef, setIsHovering];
};
