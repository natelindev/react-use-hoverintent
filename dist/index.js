"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHoverIntent = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useHoverIntent = function useHoverIntent(options) {
  var _ref = options !== null && options !== void 0 ? options : {},
      ref = _ref.ref,
      _ref$sensitivity = _ref.sensitivity,
      sensitivity = _ref$sensitivity === void 0 ? 6 : _ref$sensitivity,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 100 : _ref$interval,
      _ref$timeout = _ref.timeout,
      timeout = _ref$timeout === void 0 ? 0 : _ref$timeout;

  var intentRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isHovering = _useState2[0],
      setIsHovering = _useState2[1];

  var x = 0,
      y = 0,
      pX = 0,
      pY = 0,
      timer = 0;

  var delay = function delay(e) {
    if (timer) {
      clearTimeout(timer);
    }

    return setIsHovering(false);
  };

  var tracker = function tracker(e) {
    x = e.clientX;
    y = e.clientY;
  };

  var compare = function compare(e) {
    if (timer) {
      clearTimeout(timer);
    }

    if (Math.abs(pX - x) + Math.abs(pY - y) < sensitivity) {
      return setIsHovering(true);
    } else {
      pX = x;
      pY = y;
      timer = window.setTimeout(function () {
        return compare(e);
      }, interval);
    }
  };

  var dispatchOver = function dispatchOver(e) {
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

      timer = window.setTimeout(function () {
        return compare(e);
      }, interval);
    }
  };

  var dispatchOut = function dispatchOut(e) {
    if (timer) {
      clearTimeout(timer);
    }

    if (intentRef.current) {
      intentRef.current.removeEventListener("mousemove", tracker, false);
    }

    if (isHovering) {
      timer = window.setTimeout(function () {
        return delay(e);
      }, timeout);
    }
  };

  (0, _react.useEffect)(function () {
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
  (0, _react.useImperativeHandle)(ref, function () {
    return intentRef.current;
  }, [intentRef]);
  return [isHovering, intentRef, setIsHovering];
};

exports.useHoverIntent = useHoverIntent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsInVzZVJlZiIsInVzZVN0YXRlIiwiaXNIb3ZlcmluZyIsInNldElzSG92ZXJpbmciLCJ4IiwieSIsInBYIiwicFkiLCJ0aW1lciIsImRlbGF5IiwiZSIsImNsZWFyVGltZW91dCIsInRyYWNrZXIiLCJjbGllbnRYIiwiY2xpZW50WSIsImNvbXBhcmUiLCJNYXRoIiwiYWJzIiwid2luZG93Iiwic2V0VGltZW91dCIsImRpc3BhdGNoT3ZlciIsImN1cnJlbnQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImRpc3BhdGNoT3V0IiwidXNlRWZmZWN0IiwiY3VycmVudFJlZiIsInVzZUltcGVyYXRpdmVIYW5kbGUiXSwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlzcGF0Y2gsXG4gIFNldFN0YXRlQWN0aW9uLFxuICB1c2VTdGF0ZSxcbiAgdXNlRWZmZWN0LFxuICB1c2VJbXBlcmF0aXZlSGFuZGxlLFxuICB1c2VSZWYsXG59IGZyb20gXCJyZWFjdFwiO1xuXG5pbnRlcmZhY2Ugb3B0aW9uVHlwZSB7XG4gIHJlZj86IFJlYWN0LlJlZjxIVE1MRWxlbWVudCB8IG51bGw+O1xuICBzZW5zaXRpdml0eT86IG51bWJlcjtcbiAgaW50ZXJ2YWw/OiBudW1iZXI7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCB1c2VIb3ZlckludGVudCA9IDxUPihcbiAgb3B0aW9ucz86IG9wdGlvblR5cGVcbik6IFtcbiAgYm9vbGVhbixcbiAgUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50ICYgVD4sXG4gIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PlxuXSA9PiB7XG4gIGNvbnN0IHsgcmVmLCBzZW5zaXRpdml0eSA9IDYsIGludGVydmFsID0gMTAwLCB0aW1lb3V0ID0gMCB9ID0gb3B0aW9ucyA/PyB7fTtcbiAgY29uc3QgaW50ZW50UmVmID0gdXNlUmVmPEhUTUxFbGVtZW50ICYgVD4obnVsbCk7XG4gIGNvbnN0IFtpc0hvdmVyaW5nLCBzZXRJc0hvdmVyaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBsZXQgeCA9IDAsXG4gICAgeSA9IDAsXG4gICAgcFggPSAwLFxuICAgIHBZID0gMCxcbiAgICB0aW1lciA9IDA7XG4gIGNvbnN0IGRlbGF5ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIHJldHVybiBzZXRJc0hvdmVyaW5nKGZhbHNlKTtcbiAgfTtcbiAgY29uc3QgdHJhY2tlciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgeCA9IGUuY2xpZW50WDtcbiAgICB5ID0gZS5jbGllbnRZO1xuICB9O1xuICBjb25zdCBjb21wYXJlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhwWCAtIHgpICsgTWF0aC5hYnMocFkgLSB5KSA8IHNlbnNpdGl2aXR5KSB7XG4gICAgICByZXR1cm4gc2V0SXNIb3ZlcmluZyh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcFggPSB4O1xuICAgICAgcFkgPSB5O1xuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb21wYXJlKGUpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkaXNwYXRjaE92ZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICBpbnRlbnRSZWYuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCFpc0hvdmVyaW5nKSB7XG4gICAgICBwWCA9IGUuY2xpZW50WDtcbiAgICAgIHBZID0gZS5jbGllbnRZO1xuICAgICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGludGVudFJlZi5jdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdHJhY2tlciwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb21wYXJlKGUpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkaXNwYXRjaE91dCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgIGludGVudFJlZi5jdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdHJhY2tlciwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoaXNIb3ZlcmluZykge1xuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBkZWxheShlKSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFJlZiA9IGludGVudFJlZi5jdXJyZW50O1xuICAgIGlmIChjdXJyZW50UmVmKSB7XG4gICAgICBjdXJyZW50UmVmLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZGlzcGF0Y2hPdmVyLCBmYWxzZSk7XG4gICAgICBjdXJyZW50UmVmLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBkaXNwYXRjaE91dCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50UmVmKSB7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBkaXNwYXRjaE92ZXIsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFJlZi5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZGlzcGF0Y2hPdXQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICB1c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgKCkgPT4gaW50ZW50UmVmLmN1cnJlbnQsIFtpbnRlbnRSZWZdKTtcblxuICByZXR1cm4gW2lzSG92ZXJpbmcsIGludGVudFJlZiwgc2V0SXNIb3ZlcmluZ107XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBZ0JPLElBQU1BLGNBQWMsR0FBRyxTQUFqQkEsY0FBaUIsQ0FDNUJDLE9BRDRCLEVBTXpCO0VBQ0gsV0FBOERBLE9BQTlELGFBQThEQSxPQUE5RCxjQUE4REEsT0FBOUQsR0FBeUUsRUFBekU7RUFBQSxJQUFRQyxHQUFSLFFBQVFBLEdBQVI7RUFBQSw0QkFBYUMsV0FBYjtFQUFBLElBQWFBLFdBQWIsaUNBQTJCLENBQTNCO0VBQUEseUJBQThCQyxRQUE5QjtFQUFBLElBQThCQSxRQUE5Qiw4QkFBeUMsR0FBekM7RUFBQSx3QkFBOENDLE9BQTlDO0VBQUEsSUFBOENBLE9BQTlDLDZCQUF3RCxDQUF4RDs7RUFDQSxJQUFNQyxTQUFTLEdBQUcsSUFBQUMsYUFBQSxFQUF3QixJQUF4QixDQUFsQjs7RUFDQSxnQkFBb0MsSUFBQUMsZUFBQSxFQUFTLEtBQVQsQ0FBcEM7RUFBQTtFQUFBLElBQU9DLFVBQVA7RUFBQSxJQUFtQkMsYUFBbkI7O0VBRUEsSUFBSUMsQ0FBQyxHQUFHLENBQVI7RUFBQSxJQUNFQyxDQUFDLEdBQUcsQ0FETjtFQUFBLElB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