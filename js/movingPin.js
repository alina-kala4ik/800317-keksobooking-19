
'use strict';

(function () {

  var MIN_COORDS_X_PIN_MAIN = 130;
  var MAX_COORDS_X_PIN_MAIN = 630;

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var maxCoordsYPinMain = mapPins.offsetWidth - (window.util.MAP_PIN_SIZE / 2);
  var minCoordsYPinMain = window.util.MAP_PIN_SIZE / -2;


  var getCoordsMapMain = function (evt, startCoords) {

    var shift = {
      x: startCoords.x - evt.clientX,
      y: startCoords.y - evt.clientY
    };

    var coordTopPin = Math.ceil(mapPinMain.offsetTop - shift.y);
    var coordLeftPin = Math.ceil(mapPinMain.offsetLeft - shift.x);

    if (coordTopPin > MAX_COORDS_X_PIN_MAIN) {
      coordTopPin = MAX_COORDS_X_PIN_MAIN;
    }
    if (coordTopPin < MIN_COORDS_X_PIN_MAIN) {
      coordTopPin = MIN_COORDS_X_PIN_MAIN;
    }
    if (coordLeftPin < minCoordsYPinMain) {
      coordLeftPin = minCoordsYPinMain;
    }
    if (coordLeftPin > maxCoordsYPinMain) {
      coordLeftPin = maxCoordsYPinMain;
    }

    mapPinMain.style.top = coordTopPin + 'px';
    mapPinMain.style.left = coordLeftPin + 'px';

    address.value = Math.ceil(coordLeftPin + window.util.MAP_PIN_SIZE / 2) + ' ' + Math.ceil(coordTopPin + window.util.MAP_PIN_SIZE + window.util.MAP_PIN_HEIGHT_ARROW);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {

      getCoordsMapMain(moveEvt, startCoords);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
    };

    var onMouseUp = function (upEvt) {
      getCoordsMapMain(upEvt, startCoords);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
