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
  return [isHovering, setIsHovering, intentRef];
};

exports.useHoverIntent = useHoverIntent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsImlzSG92ZXJpbmciLCJzZXRJc0hvdmVyaW5nIiwieCIsInkiLCJwWCIsInBZIiwidGltZXIiLCJkZWxheSIsImUiLCJjbGVhclRpbWVvdXQiLCJ0cmFja2VyIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wYXJlIiwiTWF0aCIsImFicyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXNwYXRjaE92ZXIiLCJjdXJyZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaE91dCIsImN1cnJlbnRSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFnQk8sSUFBTUEsY0FBYyxHQUFHLFNBQWpCQSxjQUFpQixDQUM1QkMsT0FENEIsRUFNekI7QUFDSCxhQUE4REEsT0FBOUQsYUFBOERBLE9BQTlELGNBQThEQSxPQUE5RCxHQUF5RSxFQUF6RTtBQUFBLE1BQVFDLEdBQVIsUUFBUUEsR0FBUjtBQUFBLDhCQUFhQyxXQUFiO0FBQUEsTUFBYUEsV0FBYixpQ0FBMkIsQ0FBM0I7QUFBQSwyQkFBOEJDLFFBQTlCO0FBQUEsTUFBOEJBLFFBQTlCLDhCQUF5QyxHQUF6QztBQUFBLDBCQUE4Q0MsT0FBOUM7QUFBQSxNQUE4Q0EsT0FBOUMsNkJBQXdELENBQXhEOztBQUNBLE1BQU1DLFNBQVMsR0FBRyxtQkFBd0IsSUFBeEIsQ0FBbEI7O0FBQ0Esa0JBQW9DLHFCQUFTLEtBQVQsQ0FBcEM7QUFBQTtBQUFBLE1BQU9DLFVBQVA7QUFBQSxNQUFtQkMsYUFBbkI7O0FBRUEsTUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFBQSxNQUNFQyxDQUFDLEdBQUcsQ0FETjtBQUFBLE1BRUVDLEVBQUUsR0FBRyxDQUZQO0FBQUEsTUFH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QUNvQixPQUE3Qjs7QUFDQSxRQUFJSSxVQUFKLEVBQWdCO0FBQ2RBLE1BQUFBLFVBQVUsQ0FBQ0YsZ0JBQVgsQ0FBNEIsV0FBNUIsRUFBeUNILFlBQXpDLEVBQXVELEtBQXZEO0FBQ0FLLE1BQUFBLFVBQVUsQ0FBQ0YsZ0JBQVgsQ0FBNEIsVUFBNUIsRUFBd0NDLFdBQXhDLEVBQXFELEtBQXJEO0FBQ0Q7O0FBRUQsV0FBTyxZQUFNO0FBQ1gsVUFBSWhCLEtBQUosRUFBVztBQUNURyxRQUFBQSxZQUFZLENBQUNILEtBQUQsQ0FBWjtBQUNEOztBQUNELFVBQUlpQixVQUFKLEVBQWdCO0FBQ2RBLFFBQUFBLFVBQVUsQ0FBQ0gsbUJBQVgsQ0FBK0IsV0FBL0IsRUFBNENGLFlBQTVDLEVBQTBELEtBQTFEO0FBQ0FLLFFBQUFBLFVBQVUsQ0FBQ0gsbUJBQVgsQ0FBK0IsVUFBL0IsRUFBMkNFLFdBQTNDLEVBQXdELEtBQXhEO0FBQ0Q7QUFDRixLQVJEO0FBU0QsR0FoQkQ7QUFrQkEsa0NBQW9CM0IsR0FBcEIsRUFBeUI7QUFBQSxXQUFNSSxTQUFTLENBQUNvQixPQUFoQjtBQUFBLEdBQXpCLEVBQWtELENBQUNwQixTQUFELENBQWxEO0FBRUEsU0FBTyxDQUFDQyxVQUFELEVBQWFDLGFBQWIsRUFBNEJGLFNBQTVCLENBQVA7QUFDRCxDQXZGTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpc3BhdGNoLFxuICBTZXRTdGF0ZUFjdGlvbixcbiAgdXNlU3RhdGUsXG4gIHVzZUVmZmVjdCxcbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZSxcbiAgdXNlUmVmLFxufSBmcm9tIFwicmVhY3RcIjtcblxuaW50ZXJmYWNlIG9wdGlvblR5cGUge1xuICByZWY/OiBSZWFjdC5SZWY8SFRNTEVsZW1lbnQgfCBudWxsPjtcbiAgc2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIGludGVydmFsPzogbnVtYmVyO1xuICB0aW1lb3V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgdXNlSG92ZXJJbnRlbnQgPSA8VD4oXG4gIG9wdGlvbnM/OiBvcHRpb25UeXBlXG4pOiBbXG4gIGJvb2xlYW4sXG4gIERpc3BhdGNoPFNldFN0YXRlQWN0aW9uPGJvb2xlYW4+PixcbiAgUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50ICYgVD5cbl0gPT4ge1xuICBjb25zdCB7IHJlZiwgc2Vuc2l0aXZpdHkgPSA2LCBpbnRlcnZhbCA9IDEwMCwgdGltZW91dCA9IDAgfSA9IG9wdGlvbnMgPz8ge307XG4gIGNvbnN0IGludGVudFJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCAmIFQ+KG51bGwpO1xuICBjb25zdCBbaXNIb3ZlcmluZywgc2V0SXNIb3ZlcmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgbGV0IHggPSAwLFxuICAgIHkgPSAwLFxuICAgIHBYID0gMCxcbiAgICBwWSA9IDAsXG4gICAgdGltZXIgPSAwO1xuICBjb25zdCBkZWxheSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICByZXR1cm4gc2V0SXNIb3ZlcmluZyhmYWxzZSk7XG4gIH07XG4gIGNvbnN0IHRyYWNrZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHggPSBlLmNsaWVudFg7XG4gICAgeSA9IGUuY2xpZW50WTtcbiAgfTtcbiAgY29uc3QgY29tcGFyZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMocFggLSB4KSArIE1hdGguYWJzKHBZIC0geSkgPCBzZW5zaXRpdml0eSkge1xuICAgICAgcmV0dXJuIHNldElzSG92ZXJpbmcodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBYID0geDtcbiAgICAgIHBZID0geTtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY29tcGFyZShlKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGlzcGF0Y2hPdmVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgaW50ZW50UmVmLmN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLCB0cmFja2VyLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICghaXNIb3ZlcmluZykge1xuICAgICAgcFggPSBlLmNsaWVudFg7XG4gICAgICBwWSA9IGUuY2xpZW50WTtcbiAgICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgICBpbnRlbnRSZWYuY3VycmVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY29tcGFyZShlKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGlzcGF0Y2hPdXQgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICBpbnRlbnRSZWYuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGlzSG92ZXJpbmcpIHtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZGVsYXkoZSksIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRSZWYgPSBpbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoY3VycmVudFJlZikge1xuICAgICAgY3VycmVudFJlZi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGRpc3BhdGNoT3ZlciwgZmFsc2UpO1xuICAgICAgY3VycmVudFJlZi5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZGlzcGF0Y2hPdXQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKHRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFJlZikge1xuICAgICAgICBjdXJyZW50UmVmLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZGlzcGF0Y2hPdmVyLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGRpc3BhdGNoT3V0LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsICgpID0+IGludGVudFJlZi5jdXJyZW50LCBbaW50ZW50UmVmXSk7XG5cbiAgcmV0dXJuIFtpc0hvdmVyaW5nLCBzZXRJc0hvdmVyaW5nLCBpbnRlbnRSZWZdO1xufTtcbiJdfQ==