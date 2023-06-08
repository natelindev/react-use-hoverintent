import { useRef, useState, useEffect, useImperativeHandle } from 'react';

var useHoverIntent = function (options) {
    var _a = options !== null && options !== void 0 ? options : {}, ref = _a.ref, _b = _a.sensitivity, sensitivity = _b === void 0 ? 6 : _b, _c = _a.interval, interval = _c === void 0 ? 100 : _c, _d = _a.timeout, timeout = _d === void 0 ? 0 : _d;
    var intentRef = useRef(null);
    var _e = useState(false), isHovering = _e[0], setIsHovering = _e[1];
    var x = 0, y = 0, pX = 0, pY = 0, timer = 0;
    var delay = function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        return setIsHovering(false);
    };
    var tracker = function (e) {
        x = e.clientX;
        y = e.clientY;
    };
    var compare = function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        if (Math.abs(pX - x) + Math.abs(pY - y) < sensitivity) {
            return setIsHovering(true);
        }
        else {
            pX = x;
            pY = y;
            timer = window.setTimeout(function () { return compare(); }, interval);
        }
    };
    var dispatchOver = function (e) {
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
            timer = window.setTimeout(function () { return compare(); }, interval);
        }
    };
    var dispatchOut = function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        if (intentRef.current) {
            intentRef.current.removeEventListener("mousemove", tracker, false);
        }
        if (isHovering) {
            timer = window.setTimeout(function () { return delay(); }, timeout);
        }
    };
    useEffect(function () {
        var currentRef = intentRef.current;
        if (currentRef) {
            currentRef.addEventListener("mouseover", dispatchOver, false);
            currentRef.addEventListener("mouseout", dispatchOut, false);
        }
        return function () {
            if (timer) {
                clearTimeout(timer);
            }
            if (currentRef) {
                currentRef.removeEventListener("mouseover", dispatchOver, false);
                currentRef.removeEventListener("mouseout", dispatchOut, false);
            }
        };
    });
    useImperativeHandle(ref, function () { return intentRef.current; }, [intentRef]);
    return [isHovering, intentRef, setIsHovering];
};

export { useHoverIntent };
