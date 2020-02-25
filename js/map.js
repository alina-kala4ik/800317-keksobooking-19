'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');

  var filtersContainer = document.querySelector('.map__filters-container');

  var openPopup = function (pressPin, ad) {
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }

    var allPins = mapPins.querySelectorAll('.map__pin');
    allPins.forEach(function (item) {
      item.classList.remove('map__pin--active');
    });
    pressPin.classList.add('map__pin--active');

    map.insertBefore(window.card.return(ad), filtersContainer);

    var newMapCard = document.querySelector('.map__card');
    var popupClose = document.querySelector('.popup__close');

    var popupCloseEventHandler = function () {
      newMapCard.parentNode.removeChild(newMapCard);
      pressPin.classList.remove('map__pin--active');
    };

    popupClose.addEventListener('click', popupCloseEventHandler);

    document.addEventListener('keydown', function (evtClose) {
      window.util.isEscEvent(evtClose, popupCloseEventHandler);
    });
  };

  window.map = {
    openPopup: openPopup
  };

})();
