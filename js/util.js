'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var MAIN_MOUSE_BUTTON = 0;

  var isEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var isMainButtonMouseEvent = function (evt, action) {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      action();
    }
  };

  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    randomInteger: randomInteger,
    isEnterEvent: isEnterEvent,
    isMainButtonMouseEvent: isMainButtonMouseEvent
  };

})();