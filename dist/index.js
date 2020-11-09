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

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsImlzSG92ZXJpbmciLCJzZXRJc0hvdmVyaW5nIiwieCIsInkiLCJwWCIsInBZIiwidGltZXIiLCJkZWxheSIsImUiLCJjbGVhclRpbWVvdXQiLCJ0cmFja2VyIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wYXJlIiwiTWF0aCIsImFicyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXNwYXRjaE92ZXIiLCJjdXJyZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaE91dCIsImN1cnJlbnRSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFTTyxTQUFTQSxjQUFULENBQXdCQyxPQUF4QixFQUE2QztBQUFBLE1BQzFDQyxHQUQwQyxHQUNZRCxPQURaLENBQzFDQyxHQUQwQztBQUFBLDZCQUNZRCxPQURaLENBQ3JDRSxXQURxQztBQUFBLE1BQ3JDQSxXQURxQyxxQ0FDdkIsQ0FEdUI7QUFBQSwwQkFDWUYsT0FEWixDQUNwQkcsUUFEb0I7QUFBQSxNQUNwQkEsUUFEb0Isa0NBQ1QsR0FEUztBQUFBLHlCQUNZSCxPQURaLENBQ0pJLE9BREk7QUFBQSxNQUNKQSxPQURJLGlDQUNNLENBRE47QUFFbEQsTUFBTUMsU0FBUyxHQUFHLG1CQUFvQixJQUFwQixDQUFsQjs7QUFGa0Qsa0JBR2QscUJBQVMsS0FBVCxDQUhjO0FBQUE7QUFBQSxNQUczQ0MsVUFIMkM7QUFBQSxNQUcvQkMsYUFIK0I7O0FBS2xELE1BQUlDLENBQUMsR0FBRyxDQUFSO0FBQUEsTUFDRUMsQ0FBQyxHQUFHLENBRE47QUFBQSxNQUVFQyxFQUFFLEdBQUcsQ0FGUDtBQUFBLE1BR0VDLEVBQUUsR0FBRyxDQUhQO0FBQUEsTUFJRUMs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QUFnQjtBQUNkQSxNQUFBQSxVQUFVLENBQUNGLGdCQUFYLENBQTRCLFdBQTVCLEVBQXlDSCxZQUF6QyxFQUF1RCxLQUF2RDtBQUNBSyxNQUFBQSxVQUFVLENBQUNGLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDQyxXQUF4QyxFQUFxRCxLQUFyRDtBQUNEOztBQUVELFdBQU8sWUFBTTtBQUNYLFVBQUlDLFVBQUosRUFBZ0I7QUFDZEEsUUFBQUEsVUFBVSxDQUFDSCxtQkFBWCxDQUErQixXQUEvQixFQUE0Q0YsWUFBNUMsRUFBMEQsS0FBMUQ7QUFDQUssUUFBQUEsVUFBVSxDQUFDSCxtQkFBWCxDQUErQixVQUEvQixFQUEyQ0UsV0FBM0MsRUFBd0QsS0FBeEQ7QUFDRDtBQUNGLEtBTEQ7QUFNRCxHQWJEO0FBZUEsa0NBQW9CM0IsR0FBcEIsRUFBeUI7QUFBQSxXQUFNSSxTQUFTLENBQUNvQixPQUFoQjtBQUFBLEdBQXpCLEVBQWtELENBQUNwQixTQUFELENBQWxEO0FBRUEsU0FBTyxDQUFDQyxVQUFELEVBQWFELFNBQWIsQ0FBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VJbXBlcmF0aXZlSGFuZGxlIH0gZnJvbSAncmVhY3QnO1xuXG5pbnRlcmZhY2Ugb3B0aW9uVHlwZSB7XG4gIHJlZj86IFJlYWN0LlJlZjxIVE1MRWxlbWVudCB8IG51bGw+O1xuICBzZW5zaXRpdml0eT86IG51bWJlcjtcbiAgaW50ZXJ2YWw/OiBudW1iZXI7XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VIb3ZlckludGVudChvcHRpb25zOiBvcHRpb25UeXBlKSB7XG4gIGNvbnN0IHsgcmVmLCBzZW5zaXRpdml0eSA9IDYsIGludGVydmFsID0gMTAwLCB0aW1lb3V0ID0gMCB9ID0gb3B0aW9ucztcbiAgY29uc3QgaW50ZW50UmVmID0gdXNlUmVmPEhUTUxFbGVtZW50PihudWxsKTtcbiAgY29uc3QgW2lzSG92ZXJpbmcsIHNldElzSG92ZXJpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGxldCB4ID0gMCxcbiAgICB5ID0gMCxcbiAgICBwWCA9IDAsXG4gICAgcFkgPSAwLFxuICAgIHRpbWVyID0gMDtcbiAgY29uc3QgZGVsYXkgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHNldElzSG92ZXJpbmcoZmFsc2UpO1xuICB9O1xuICBjb25zdCB0cmFja2VyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICB4ID0gZS5jbGllbnRYO1xuICAgIHkgPSBlLmNsaWVudFk7XG4gIH07XG4gIGNvbnN0IGNvbXBhcmUgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgaWYgKE1hdGguYWJzKHBYIC0geCkgKyBNYXRoLmFicyhwWSAtIHkpIDwgc2Vuc2l0aXZpdHkpIHtcbiAgICAgIHJldHVybiBzZXRJc0hvdmVyaW5nKHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwWCA9IHg7XG4gICAgICBwWSA9IHk7XG4gICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGNvbXBhcmUoZSksIGludGVydmFsKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGRpc3BhdGNoT3ZlciA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgIGludGVudFJlZi5jdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKCFpc0hvdmVyaW5nKSB7XG4gICAgICBwWCA9IGUuY2xpZW50WDtcbiAgICAgIHBZID0gZS5jbGllbnRZO1xuICAgICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICAgIGludGVudFJlZi5jdXJyZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICAgIH1cbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY29tcGFyZShlKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGlzcGF0Y2hPdXQgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIGlmICh0aW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICB9XG4gICAgaWYgKGludGVudFJlZi5jdXJyZW50KSB7XG4gICAgICBpbnRlbnRSZWYuY3VycmVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0cmFja2VyLCBmYWxzZSk7XG4gICAgfVxuICAgIGlmIChpc0hvdmVyaW5nKSB7XG4gICAgICB0aW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IGRlbGF5KGUpLCB0aW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBjdXJyZW50UmVmID0gaW50ZW50UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGN1cnJlbnRSZWYpIHtcbiAgICAgIGN1cnJlbnRSZWYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZGlzcGF0Y2hPdmVyLCBmYWxzZSk7XG4gICAgICBjdXJyZW50UmVmLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZGlzcGF0Y2hPdXQsIGZhbHNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgaWYgKGN1cnJlbnRSZWYpIHtcbiAgICAgICAgY3VycmVudFJlZi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBkaXNwYXRjaE92ZXIsIGZhbHNlKTtcbiAgICAgICAgY3VycmVudFJlZi5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGRpc3BhdGNoT3V0LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG5cbiAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsICgpID0+IGludGVudFJlZi5jdXJyZW50LCBbaW50ZW50UmVmXSk7XG5cbiAgcmV0dXJuIFtpc0hvdmVyaW5nLCBpbnRlbnRSZWZdO1xufVxuIl19