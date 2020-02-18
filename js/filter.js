'use strict';

(function () {

  var QUALITY_PINS = 5;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var mapPins = document.querySelector('.map__pins');

  var adsLocal = [];
  var houseTypeChech;

  var copyData = function (adsBackend) {
    adsLocal = adsBackend;
    filterQualityPins(adsLocal);
  };

  window.backend.load(copyData);

  var filterQualityPins = function (someMassive) {
    var qualityPinsMassive = someMassive.slice(0, QUALITY_PINS);
    window.pin.generate(qualityPinsMassive);
  };

  var filterTypeHousing = function () {
    var typeHouseMassive = adsLocal.filter(function (element) {
      return element.offer.type === houseTypeChech;
    });
    filterQualityPins(typeHouseMassive);
    console.log(typeHouseMassive)
  };

  var updatePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }
    mapPins.appendChild(window.pin.return);
  };

  mapFilters.addEventListener('change', function (evt) {
    if (evt.target === housingType) {
      houseTypeChech = evt.target.value;
      filterTypeHousing();
      updatePins();
    }
  });

})();
