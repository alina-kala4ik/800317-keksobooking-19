
'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var MIN_COORDS_X_PIN_MAIN = 130;
  var MAX_COORDS_X_PIN_MAIN = 630;

  var getCoords = function (elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.right
    };
  };

  var coordsMapMain = function () {
    var coordsMapPinMain = getCoords(mapPinMain);
    var coordsMapPins = getCoords(mapPins);

    var coordsRightMapPins = coordsMapPins.right;
    var coordsLeftMapPins = coordsMapPins.left;

    var coordsTopMapPinMain = coordsMapPinMain.top + window.util.MAP_PIN_SIZE + window.util.MAP_PIN_HEIGHT_ARROW;
    var coordsLeftMapPinMain = coordsMapPinMain.left + (window.util.MAP_PIN_SIZE / 2);

    if (coordsTopMapPinMain < MIN_COORDS_X_PIN_MAIN) {
      coordsTopMapPinMain = MIN_COORDS_X_PIN_MAIN;
    } else if (coordsTopMapPinMain > MAX_COORDS_X_PIN_MAIN) {
      coordsTopMapPinMain = MAX_COORDS_X_PIN_MAIN;
    }
    if (coordsLeftMapPinMain < coordsLeftMapPins) {
      coordsLeftMapPinMain = coordsLeftMapPins;
    } else if (coordsLeftMapPinMain > coordsRightMapPins) {
      coordsLeftMapPinMain = coordsRightMapPins;
    }
    return Math.ceil(coordsLeftMapPinMain) + ' ,' + Math.ceil(coordsTopMapPinMain);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';

      address.value = coordsMapMain();
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      address.value = coordsMapMain();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
