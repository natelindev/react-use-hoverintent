import { useState, useEffect, useRef, useImperativeHandle } from 'react';
export function useHoverIntent(options) {
    var ref = options.ref, _a = options.sensitivity, sensitivity = _a === void 0 ? 6 : _a, _b = options.interval, interval = _b === void 0 ? 100 : _b, _c = options.timeout, timeout = _c === void 0 ? 0 : _c;
    var intentRef = useRef(null);
    var _d = useState(false), isHovering = _d[0], setIsHovering = _d[1];
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
            timer = window.setTimeout(function () { return compare(e); }, interval);
        }
    };
    var dispatchOver = function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        if (intentRef.current) {
            intentRef.current.removeEventListener('mousemove', tracker, false);
        }
        if (!isHovering) {
            pX = e.clientX;
            pY = e.clientY;
            if (intentRef.current) {
                intentRef.current.addEventListener('mousemove', tracker, false);
            }
            timer = window.setTimeout(function () { return compare(e); }, interval);
        }
    };
    var dispatchOut = function (e) {
        if (timer) {
            clearTimeout(timer);
        }
        if (intentRef.current) {
            intentRef.current.removeEventListener('mousemove', tracker, false);
        }
        if (isHovering) {
            timer = window.setTimeout(function () { return delay(e); }, timeout);
        }
    };
    useEffect(function () {
        var currentRef = intentRef.current;
        if (currentRef) {
            currentRef.addEventListener('mouseover', dispatchOver, false);
            currentRef.addEventListener('mouseout', dispatchOut, false);
        }
        return function () {
            if (currentRef) {
                currentRef.removeEventListener('mouseover', dispatchOver, false);
                currentRef.removeEventListener('mouseout', dispatchOut, false);
            }
        };
    });
    useImperativeHandle(ref, function () { return intentRef.current; }, [intentRef]);
    return [isHovering, intentRef];
}
//# sourceMappingURL=index.js.map