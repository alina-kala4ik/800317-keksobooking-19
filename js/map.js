'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');

  var returnPinsAndCard = function () {
    mapPins.appendChild(window.pin.return);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMainButtonMouseEvent(evt, returnPinsAndCard);
  }, {once: true});

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, returnPinsAndCard);
  }, {once: true});

  var openPopup = function (pressPin) {
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }

    var i = pressPin.getAttribute('i');
    map.insertBefore(window.card.return(i), filtersContainer);

    var newMapCard = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');

    var popupCloseEventHandler = function () {
      newMapCard.style.display = 'none';
    };

    popupClose.addEventListener('click', popupCloseEventHandler);

    document.addEventListener('keydown', function (evtClose) {
      window.util.isEscEvent(evtClose, popupCloseEventHandler);
    });
  };

  mapPins.addEventListener('click', function (evt) {
    if (evt.target.closest('.map__pin img') && !evt.target.closest('.map__pin--main')) {
      var pressPin = evt.target;
      openPopup(pressPin);
    }
  });

  mapPins.addEventListener('keydown', function (evt) {
    var pressPin = evt.target.querySelector('img');
    if (pressPin.closest('.map__pin img') && !pressPin.closest('.map__pin--main') && evt.key === window.util.ENTER_KEY) {
      openPopup(pressPin);
    }
  }, true);

})();
