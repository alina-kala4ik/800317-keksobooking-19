'use strict';

(function () {

  var ENTER_KEY = 'Enter';
  var ESC_KEY = 'Escape';
  var MAIN_MOUSE_BUTTON = 0;
  var MAP_PIN_SIZE = 65;
  var MAP_PIN_HEIGHT_ARROW = 19;

  var getSomethingIfEnterEvent = function (evt, action) {
    if (evt.key === ENTER_KEY) {
      action();
    }
  };

  var getSomethingIfEscEvent = function (evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  };

  var getSomethingIfMainButtonMouseEvent = function (evt, action) {
    if (evt.button === MAIN_MOUSE_BUTTON) {
      action();
    }
  };

  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    randomInteger: getRandomInteger,
    isEnterEvent: getSomethingIfEnterEvent,
    isMainButtonMouseEvent: getSomethingIfMainButtonMouseEvent,
    isEscEvent: getSomethingIfEscEvent,
    MAP_PIN_SIZE: MAP_PIN_SIZE,
    MAP_PIN_HEIGHT_ARROW: MAP_PIN_HEIGHT_ARROW,
    ENTER_KEY: ENTER_KEY
  };

})();
