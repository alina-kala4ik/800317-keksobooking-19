'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');

  var returnPinsAndCard = function () {
    mapPins.appendChild(window.pin.return);
  };

  // mapPinMain.addEventListener('mousedown', function (evt) {
  //   window.util.isMainButtonMouseEvent(evt, returnPinsAndCard);
  // });

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, returnPinsAndCard);
  });

  var openPopup = function (pressPin) {
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }

    var i = pressPin.getAttribute('data-i');
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

  var isAd = function (evt) {
    if (evt.target.closest('.map__pin') && !evt.target.closest('.map__pin--main')) {
      var pressPin;
      if (evt.toElement.offsetParent.tagName === 'BUTTON') {
        pressPin = evt.toElement.offsetParent;
      } else if (evt.target.tagName === 'BUTTON') {
        pressPin = evt.target;
      }
      openPopup(pressPin);
    }
  };

  mapPins.addEventListener('click', isAd);

  mapPins.addEventListener('keydown', function () {
    window.util.isEnterEvent(isAd);
  });

})();
