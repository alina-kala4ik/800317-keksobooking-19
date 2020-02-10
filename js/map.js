'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');

  var returnPinsAndCard = function () {
    mapPins.appendChild(window.pin.return);
    map.insertBefore(window.card.return, filtersContainer);
  };

  // mapPinMain.addEventListener('mousedown', function (evt) {
  //   window.util.isMainButtonMouseEvent(evt, returnPinsAndCard);
  // });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, returnPinsAndCard);
  });

})();
