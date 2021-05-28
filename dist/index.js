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

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function useHoverIntent(options) {
  var ref = options.ref,
      _options$sensitivity = options.sensitivity,
      sensitivity = _options$sensitivity === void 0 ? 6 : _options$sensitivity,
      _options$interval = options.interval,
      interval = _options$interval === void 0 ? 100 : _options$interval,
      _options$timeout = options.timeout,
      timeout = _options$timeout === void 0 ? 0 : _options$timeout;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsImlzSG92ZXJpbmciLCJzZXRJc0hvdmVyaW5nIiwieCIsInkiLCJwWCIsInBZIiwidGltZXIiLCJkZWxheSIsImUiLCJjbGVhclRpbWVvdXQiLCJ0cmFja2VyIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wYXJlIiwiTWF0aCIsImFicyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXNwYXRjaE92ZXIiLCJjdXJyZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaE91dCIsImN1cnJlbnRSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFTTyxTQUFTQSxjQUFULENBQ0xDLE9BREssRUFFd0M7QUFDN0MsTUFBUUMsR0FBUixHQUE4REQsT0FBOUQsQ0FBUUMsR0FBUjtBQUFBLDZCQUE4REQsT0FBOUQsQ0FBYUUsV0FBYjtBQUFBLE1BQWFBLFdBQWIscUNBQTJCLENBQTNCO0FBQUEsMEJBQThERixPQUE5RCxDQUE4QkcsUUFBOUI7QUFBQSxNQUE4QkEsUUFBOUIsa0NBQXlDLEdBQXpDO0FBQUEseUJBQThESCxPQUE5RCxDQUE4Q0ksT0FBOUM7QUFBQSxNQUE4Q0EsT0FBOUMsaUNBQXdELENBQXhEO0FBQ0EsTUFBTUMsU0FBUyxHQUFHLG1CQUF3QixJQUF4QixDQUFsQjs7QUFDQSxrQkFBb0MscUJBQVMsS0FBVCxDQUFwQztBQUFBO0FBQUEsTUFBT0MsVUFBUDtBQUFBLE1BQW1CQyxhQUFuQjs7QUFFQSxNQUFJQyxDQUFDLEdBQUcsQ0FBUjtBQUFBLE1BQ0VDLENBQUMsR0FBRyxDQUROO0FBQUEsTUFFRUMsRUFBRSxHQUFHLENBRlA7QUFBQSxNQUdFQyxFQUFFLEdBQUcsQ0FIUDtBQUFBLE1B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QUosRUFBZ0I7QUFDZEEsTUFBQUEsVUFBVSxDQUFDRixnQkFBWCxDQUE0QixXQUE1QixFQUF5Q0gsWUFBekMsRUFBdUQsS0FBdkQ7QUFDQUssTUFBQUEsVUFBVSxDQUFDRixnQkFBWCxDQUE0QixVQUE1QixFQUF3Q0MsV0FBeEMsRUFBcUQsS0FBckQ7QUFDRDs7QUFFRCxXQUFPLFlBQU07QUFDWCxVQUFJQyxVQUFKLEVBQWdCO0FBQ2RBLFFBQUFBLFVBQVUsQ0FBQ0gsbUJBQVgsQ0FBK0IsV0FBL0IsRUFBNENGLFlBQTVDLEVBQTBELEtBQTFEO0FBQ0FLLFFBQUFBLFVBQVUsQ0FBQ0gsbUJBQVgsQ0FBK0IsVUFBL0IsRUFBMkNFLFdBQTNDLEVBQXdELEtBQXhEO0FBQ0Q7QUFDRixLQUxEO0FBTUQsR0FiRDtBQWVBLGtDQUFvQjNCLEdBQXBCLEVBQXlCO0FBQUEsV0FBTUksU0FBUyxDQUFDb0IsT0FBaEI7QUFBQSxHQUF6QixFQUFrRCxDQUFDcEIsU0FBRCxDQUFsRDtBQUVBLFNBQU8sQ0FBQ0MsVUFBRCxFQUFhRCxTQUFiLENBQVA7QUFDRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCwgdXNlSW1wZXJhdGl2ZUhhbmRsZSwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW50ZXJmYWNlIG9wdGlvblR5cGUge1xuICByZWY/OiBSZWFjdC5SZWY8SFRNTEVsZW1lbnQgfCBudWxsPjtcbiAgc2Vuc2l0aXZpdHk/OiBudW1iZXI7XG4gIGludGVydmFsPzogbnVtYmVyO1xuICB0aW1lb3V0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlSG92ZXJJbnRlbnQ8VCA9IEhUTUxFbGVtZW50PihcbiAgb3B0aW9uczogb3B0aW9uVHlwZVxuKTogW2Jvb2xlYW4sIFJlYWN0LlJlZk9iamVjdDxIVE1MRWxlbWVudCAmIFQ+XSB7XG4gIGNvbnN0IHsgcmVmLCBzZW5zaXRpdml0eSA9IDYsIGludGVydmFsID0gMTAwLCB0aW1lb3V0ID0gMCB9ID0gb3B0aW9ucztcbiAgY29uc3QgaW50ZW50UmVmID0gdXNlUmVmPEhUTUxFbGVtZW50ICYgVD4obnVsbCk7XG4gIGNvbnN0IFtpc0hvdmVyaW5nLCBzZXRJc0hvdmVyaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBsZXQgeCA9IDAsXG4gICAgeSA9IDAsXG4gICAgcFggPSAwLFxuICAgIHBZID0gMCxcbiAgICB0aW1lciA9IDA7XG4gIGNvbnN0IGRlbGF5ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIHJldHVybiBzZXRJc0hvdmVyaW5nKGZhbHNlKTtcbiAgfTtcbiAgY29uc3QgdHJhY2tlciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgeCA9IGUuY2xpZW50WDtcbiAgICB5ID0gZS5jbGllbnRZO1xuICB9O1xuICBjb25zdCBjb21wYXJlID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChNYXRoLmFicyhwWCAtIHgpICsgTWF0aC5hYnMocFkgLSB5KSA8IHNlbnNpdGl2aXR5KSB7XG4gICAgICByZXR1cm4gc2V0SXNIb3ZlcmluZyh0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcFggPSB4O1xuICAgICAgcFkgPSB5O1xuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb21wYXJlKGUpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkaXNwYXRjaE92ZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICBpbnRlbnRSZWYuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0cmFja2VyLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmICghaXNIb3ZlcmluZykge1xuICAgICAgcFggPSBlLmNsaWVudFg7XG4gICAgICBwWSA9IGUuY2xpZW50WTtcbiAgICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgICBpbnRlbnRSZWYuY3VycmVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0cmFja2VyLCBmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGNvbXBhcmUoZSksIGludGVydmFsKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGRpc3BhdGNoT3V0ID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgaW50ZW50UmVmLmN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdHJhY2tlciwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoaXNIb3ZlcmluZykge1xuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBkZWxheShlKSwgdGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFJlZiA9IGludGVudFJlZi5jdXJyZW50O1xuICAgIGlmIChjdXJyZW50UmVmKSB7XG4gICAgICBjdXJyZW50UmVmLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGRpc3BhdGNoT3ZlciwgZmFsc2UpO1xuICAgICAgY3VycmVudFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGRpc3BhdGNoT3V0LCBmYWxzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChjdXJyZW50UmVmKSB7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZGlzcGF0Y2hPdmVyLCBmYWxzZSk7XG4gICAgICAgIGN1cnJlbnRSZWYucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBkaXNwYXRjaE91dCwgZmFsc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xuXG4gIHVzZUltcGVyYXRpdmVIYW5kbGUocmVmLCAoKSA9PiBpbnRlbnRSZWYuY3VycmVudCwgW2ludGVudFJlZl0pO1xuXG4gIHJldHVybiBbaXNIb3ZlcmluZywgaW50ZW50UmVmXTtcbn1cbiJdfQ==