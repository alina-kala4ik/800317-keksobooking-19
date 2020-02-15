'use strict';

(function () {

  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');
  var mapPinMain = document.querySelector('.map__pin--main');

  var returnPins = function () {
    mapPins.appendChild(window.pin.return);
  };

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
      var allPins = mapPins.querySelectorAll('.map__pin');
      allPins.forEach(function (item) {
        item.classList.remove('map__pin--active');
      });
      pressPin.classList.add('map__pin--active');
      openPopup(pressPin);
    }
  };

  var activatesPage = function () {
    mapPins.addEventListener('click', isAd);

    mapPins.addEventListener('keydown', function () {
      window.util.isEnterEvent(isAd);
    });
  };

  var mapPinMainMousedownHandler = function (evt) {
    window.util.isMainButtonMouseEvent(evt, returnPins);
    window.util.isMainButtonMouseEvent(evt, activatesPage);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
  };

  var mapPinMainKeydownHandler = function (evt) {
    window.util.isEnterEvent(evt, returnPins);
    window.util.isEnterEvent(evt, activatesPage);
    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
  };

  mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler, {once: true});
  mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler, {once: true});

})();
