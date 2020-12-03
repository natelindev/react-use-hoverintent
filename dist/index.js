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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJ1c2VIb3ZlckludGVudCIsIm9wdGlvbnMiLCJyZWYiLCJzZW5zaXRpdml0eSIsImludGVydmFsIiwidGltZW91dCIsImludGVudFJlZiIsImlzSG92ZXJpbmciLCJzZXRJc0hvdmVyaW5nIiwieCIsInkiLCJwWCIsInBZIiwidGltZXIiLCJkZWxheSIsImUiLCJjbGVhclRpbWVvdXQiLCJ0cmFja2VyIiwiY2xpZW50WCIsImNsaWVudFkiLCJjb21wYXJlIiwiTWF0aCIsImFicyIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJkaXNwYXRjaE92ZXIiLCJjdXJyZW50IiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZXIiLCJkaXNwYXRjaE91dCIsImN1cnJlbnRSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7QUFTTyxTQUFTQSxjQUFULENBQ0xDLE9BREssRUFFd0M7QUFBQSxNQUNyQ0MsR0FEcUMsR0FDaUJELE9BRGpCLENBQ3JDQyxHQURxQztBQUFBLDZCQUNpQkQsT0FEakIsQ0FDaENFLFdBRGdDO0FBQUEsTUFDaENBLFdBRGdDLHFDQUNsQixDQURrQjtBQUFBLDBCQUNpQkYsT0FEakIsQ0FDZkcsUUFEZTtBQUFBLE1BQ2ZBLFFBRGUsa0NBQ0osR0FESTtBQUFBLHlCQUNpQkgsT0FEakIsQ0FDQ0ksT0FERDtBQUFBLE1BQ0NBLE9BREQsaUNBQ1csQ0FEWDtBQUU3QyxNQUFNQyxTQUFTLEdBQUcsbUJBQXdCLElBQXhCLENBQWxCOztBQUY2QyxrQkFHVCxxQkFBUyxLQUFULENBSFM7QUFBQTtBQUFBLE1BR3RDQyxVQUhzQztBQUFBLE1BRzFCQyxhQUgwQjs7QUFLN0MsTUFBSUMsQ0FBQyxHQUFHLENBQVI7QUFBQSxNQUNFQyxDQUFDLEdBQUcsQ0FETjtBQUFBLE1BRUVDLEVBQUUsR0FBRyxDQUZQO0FBQUEsTUFHRUMsRUFBRSxHQUFHLENBSFA7QUFBQSxNQUlF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LEVBQWdCO0FBQ2RBLE1BQUFBLFVBQVUsQ0FBQ0YsZ0JBQVgsQ0FBNEIsV0FBNUIsRUFBeUNILFlBQXpDLEVBQXVELEtBQXZEO0FBQ0FLLE1BQUFBLFVBQVUsQ0FBQ0YsZ0JBQVgsQ0FBNEIsVUFBNUIsRUFBd0NDLFdBQXhDLEVBQXFELEtBQXJEO0FBQ0Q7O0FBRUQsV0FBTyxZQUFNO0FBQ1gsVUFBSUMsVUFBSixFQUFnQjtBQUNkQSxRQUFBQSxVQUFVLENBQUNILG1CQUFYLENBQStCLFdBQS9CLEVBQTRDRixZQUE1QyxFQUEwRCxLQUExRDtBQUNBSyxRQUFBQSxVQUFVLENBQUNILG1CQUFYLENBQStCLFVBQS9CLEVBQTJDRSxXQUEzQyxFQUF3RCxLQUF4RDtBQUNEO0FBQ0YsS0FMRDtBQU1ELEdBYkQ7QUFlQSxrQ0FBb0IzQixHQUFwQixFQUF5QjtBQUFBLFdBQU1JLFNBQVMsQ0FBQ29CLE9BQWhCO0FBQUEsR0FBekIsRUFBa0QsQ0FBQ3BCLFNBQUQsQ0FBbEQ7QUFFQSxTQUFPLENBQUNDLFVBQUQsRUFBYUQsU0FBYixDQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VFZmZlY3QsIHVzZUltcGVyYXRpdmVIYW5kbGUsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5cbmludGVyZmFjZSBvcHRpb25UeXBlIHtcbiAgcmVmPzogUmVhY3QuUmVmPEhUTUxFbGVtZW50IHwgbnVsbD47XG4gIHNlbnNpdGl2aXR5PzogbnVtYmVyO1xuICBpbnRlcnZhbD86IG51bWJlcjtcbiAgdGltZW91dD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUhvdmVySW50ZW50PFQgPSBIVE1MRWxlbWVudD4oXG4gIG9wdGlvbnM6IG9wdGlvblR5cGVcbik6IFtib29sZWFuLCBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQgJiBUPl0ge1xuICBjb25zdCB7IHJlZiwgc2Vuc2l0aXZpdHkgPSA2LCBpbnRlcnZhbCA9IDEwMCwgdGltZW91dCA9IDAgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IGludGVudFJlZiA9IHVzZVJlZjxIVE1MRWxlbWVudCAmIFQ+KG51bGwpO1xuICBjb25zdCBbaXNIb3ZlcmluZywgc2V0SXNIb3ZlcmluZ10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgbGV0IHggPSAwLFxuICAgIHkgPSAwLFxuICAgIHBYID0gMCxcbiAgICBwWSA9IDAsXG4gICAgdGltZXIgPSAwO1xuICBjb25zdCBkZWxheSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICByZXR1cm4gc2V0SXNIb3ZlcmluZyhmYWxzZSk7XG4gIH07XG4gIGNvbnN0IHRyYWNrZXIgPSAoZTogTW91c2VFdmVudCkgPT4ge1xuICAgIHggPSBlLmNsaWVudFg7XG4gICAgeSA9IGUuY2xpZW50WTtcbiAgfTtcbiAgY29uc3QgY29tcGFyZSA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMocFggLSB4KSArIE1hdGguYWJzKHBZIC0geSkgPCBzZW5zaXRpdml0eSkge1xuICAgICAgcmV0dXJuIHNldElzSG92ZXJpbmcodHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBYID0geDtcbiAgICAgIHBZID0geTtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gY29tcGFyZShlKSwgaW50ZXJ2YWwpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGlzcGF0Y2hPdmVyID0gKGU6IE1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAodGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgfVxuICAgIGlmIChpbnRlbnRSZWYuY3VycmVudCkge1xuICAgICAgaW50ZW50UmVmLmN1cnJlbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdHJhY2tlciwgZmFsc2UpO1xuICAgIH1cbiAgICBpZiAoIWlzSG92ZXJpbmcpIHtcbiAgICAgIHBYID0gZS5jbGllbnRYO1xuICAgICAgcFkgPSBlLmNsaWVudFk7XG4gICAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgICAgaW50ZW50UmVmLmN1cnJlbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdHJhY2tlciwgZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGltZXIgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiBjb21wYXJlKGUpLCBpbnRlcnZhbCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkaXNwYXRjaE91dCA9IChlOiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgaWYgKHRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH1cbiAgICBpZiAoaW50ZW50UmVmLmN1cnJlbnQpIHtcbiAgICAgIGludGVudFJlZi5jdXJyZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRyYWNrZXIsIGZhbHNlKTtcbiAgICB9XG4gICAgaWYgKGlzSG92ZXJpbmcpIHtcbiAgICAgIHRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4gZGVsYXkoZSksIHRpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGN1cnJlbnRSZWYgPSBpbnRlbnRSZWYuY3VycmVudDtcbiAgICBpZiAoY3VycmVudFJlZikge1xuICAgICAgY3VycmVudFJlZi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBkaXNwYXRjaE92ZXIsIGZhbHNlKTtcbiAgICAgIGN1cnJlbnRSZWYuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBkaXNwYXRjaE91dCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpZiAoY3VycmVudFJlZikge1xuICAgICAgICBjdXJyZW50UmVmLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGRpc3BhdGNoT3ZlciwgZmFsc2UpO1xuICAgICAgICBjdXJyZW50UmVmLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgZGlzcGF0Y2hPdXQsIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcblxuICB1c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgKCkgPT4gaW50ZW50UmVmLmN1cnJlbnQsIFtpbnRlbnRSZWZdKTtcblxuICByZXR1cm4gW2lzSG92ZXJpbmcsIGludGVudFJlZl07XG59XG4iXX0=