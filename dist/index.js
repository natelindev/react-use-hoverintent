"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHoverIntent = useHoverIntent;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useHoverIntent(options) {
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
      intentRef.current.removeEventListener('mousemove', tracker, false);
    }

    if (!isHovering) {
      pX = e.clientX;
      pY = e.clientY;

      if (intentRef.current) {
        intentRef.current.addEventListener('mousemove', tracker, false);
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
      intentRef.current.removeEventListener('mousemove', tracker, false);
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
      currentRef.addEventListener('mouseover', dispatchOver, false);
      currentRef.addEventListener('mouseout', dispatchOut, false);
    }

    return function () {
      if (timer) {
        clearTimeout(timer);
      }

      if (currentRef) {
        currentRef.removeEventListener('mouseover', dispatchOver, false);
        currentRef.removeEventListener('mouseout', dispatchOut, false);
      }
    };
  });
  (0, _react.useImperativeHandle)(ref, function () {
    return intentRef.current;
  }, [intentRef]);
  return [isHovering, intentRef];
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsImlzSG92ZXJpbmciLCJzZXRJc0hvdmVyaW5nIiwieCIsInkiLCJwWCIsInBZIiwidGltZXIiLCJkZWxheSIsImUiLCJjbGVhclRpbWVvdXQiLCJ0cmFja2VyIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wYXJlIiwiTWF0aCIsImFicyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXNwYXRjaE92ZXIiLCJjdXJyZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaE91dCIsImN1cnJlbnRSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFTTyxTQUFTQSxjQUFULENBQ0xDLE9BREssRUFFd0M7QUFDN0MsYUFBOERBLE9BQTlELGFBQThEQSxPQUE5RCxjQUE4REEsT0FBOUQsR0FBeUUsRUFBekU7QUFBQSxNQUFRQyxHQUFSLFFBQVFBLEdBQVI7QUFBQSw4QkFBYUMsV0FBYjtBQUFBLE1BQWFBLFdBQWIsaUNBQTJCLENBQTNCO0FBQUEsMkJBQThCQyxRQUE5QjtBQUFBLE1BQThCQSxRQUE5Qiw4QkFBeUMsR0FBekM7QUFBQSwwQkFBOENDLE9BQTlDO0FBQUEsTUFBOENBLE9BQTlDLDZCQUF3RCxDQUF4RDs7QUFDQSxNQUFNQyxTQUFTLEdBQUcsbUJBQXdCLElBQXhCLENBQWxCOztBQUNBLGtCQUFvQyxxQkFBUyxLQUFULENBQXBDO0FBQUE7QUFBQSxNQUFPQyxVQUFQO0FBQUEsTUFBbUJDLGFBQW5COztBQUVBLE1BQUlDLENBQUMsR0FBRyxDQUFSO0FBQUEsTUFDRUMsQ0FBQyxHQUFHLENBRE47QUFBQSxNQUVFQyxFQUFFLEdBQUcsQ0FGUDtBQUFBLE1BR0VDLEVBQUUsR0FBRyxDQUhQO0FB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SUksVUFBSixFQUFnQjtBQUNkQSxNQUFBQSxVQUFVLENBQUNGLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDSCxZQUF6QyxFQUF1RCxLQUF2RDtBQUNBSyxNQUFBQSxVQUFVLENBQUNGLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDQyxXQUF4QyxFQUFxRCxLQUFyRDtBQUNEOztBQUVELFdBQU8sWUFBTTtBQUNYLFVBQUloQixLQUFKLEVBQVc7QUFDVEcsUUFBQUEsWUFBWSxDQUFDSCxLQUFELENBQVo7QUFDRDs7QUFDRCxVQUFJaUIsVUFBSixFQUFnQjtBQUNkQSxRQUFBQSxVQUFVLENBQUNILG1CQUFYLENBQStCLFdBQS9CLEVBQTRDRixZQUE1QyxFQUEwRCxLQUExRDtBQUNBSyxRQUFBQSxVQUFVLENBQUNILG1CQUFYLENBQStCLFVBQS9CLEVBQTJDRSxXQUEzQyxFQUF3RCxLQUF4RDtBQUNEO0FBQ0YsS0FSRDtBQVNELEdBaEJEO0FBa0JBLGtDQUFvQjNCLEdBQXBCLEVBQXlCO0FBQUEsV0FBTUksU0FBUyxDQUFDb0IsT0FBaEI7QUFBQSxHQUF6QixFQUFrRCxDQUFDcEIsU0FBRCxDQUFsRDtBQUVBLFNBQU8sQ0FBQ0MsVUFBRCxFQUFhRCxTQUFiLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlSW1wZXJhdGl2ZUhhbmRsZSwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIG9wdGlvblR5cGUge1xuICByZWY/OiBSZWFjdC5SZWY8SFRNTEVsZW1lbnQgfCBudWxsPjtcbiAgc2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIGludGVydmFsPzogbnVtYmVyO1xuICB0aW1lb3V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlSG92ZXJJbnRlbnQ8VCA9IEhUTUxFbGVtZW50PihcbiAgb3B0aW9ucz86IG9wdGlvblR5cGVcbik6IFtib29sZWFuLCBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQgJiBUPl0ge1xuICBjb25zdCB7IHJlZiwgc2Vuc2l0aXZpdHkgPSA2LCBpbnRlcnZhbCA9IDEwMCwgdGltZW91dCA9IDAgfSA9IG9wdGlvbnMgPz8ge307XG4gIGNvbnN0IGludGVudFJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCAmIFQ+KG51bGwpO1xuICBjb25zdCBbaXNIb3ZlcmluZywgc2V0SXNIb3ZlcmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgbGV0IHggPSAwLFxuICAgIHkgPSAwLFxuICAgIHBYID0gMCxcbiAgICBwWSA9IDAsXG4gICAgdGltZXIgPSAwO1xuICBjb25zdCBkZWxheSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICByZXR1cm4gc2V0SXNIb3ZlcmluZyhmYWxzZSk7XG4gIH07XG4gIGNvbnN0IHRyYWNrZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHggPSBlLmNsaWVudFg7XG4gICAgeSA9IGUuY2xpZW50WTtcbiAgfTtcbiAgY29uc3QgY29tcGFyZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMocFggLSB4KSArIE1hdGguYWJzKHBZIC0geSkgPCBzZW5zaXRpdml0eSkge1xuICAgICAgcmV0dXJuIHNldElzSG92ZXJpbmcodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBYID0geDtcbiAgICAgIHBZID0geTtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY29tcGFyZShlKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGlzcGF0Y2hPdmVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgaW50ZW50UmVmLmN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdHJhY2tlciwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoIWlzSG92ZXJpbmcpIHtcbiAgICAgIHBYID0gZS5jbGllbnRYO1xuICAgICAgcFkgPSBlLmNsaWVudFk7XG4gICAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgaW50ZW50UmVmLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdHJhY2tlciwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb21wYXJlKGUpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkaXNwYXRjaE91dCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgIGludGVudFJlZi5jdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGlzSG92ZXJpbmcpIHtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZGVsYXkoZSksIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRSZWYgPSBpbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoY3VycmVudFJlZikge1xuICAgICAgY3VycmVudFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBkaXNwYXRjaE92ZXIsIGZhbHNlKTtcbiAgICAgIGN1cnJlbnRSZWYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBkaXNwYXRjaE91dCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAodGltZXIpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50UmVmKSB7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZGlzcGF0Y2hPdmVyLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBkaXNwYXRjaE91dCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCAoKSA9PiBpbnRlbnRSZWYuY3VycmVudCwgW2ludGVudFJlZl0pO1xuXG4gIHJldHVybiBbaXNIb3ZlcmluZywgaW50ZW50UmVmXTtcbn1cbiJdfQ==