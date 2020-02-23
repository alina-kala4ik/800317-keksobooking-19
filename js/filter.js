'use strict';

(function () {

  var QUALITY_PINS = 5;
  var DEBOUNCE_INTERVAL = 500;

  var mapFilters = document.querySelector('.map__filters');
  var mapPins = document.querySelector('.map__pins');

  var imputNameToArrayName = {
    'housing-type': 'type',
    'housing-price': 'price',
    'housing-rooms': 'rooms',
    'housing-guests': 'guests',
  };

  var priseStringToPriseNumber = {
    'middleMax': 50000,
    'middleMin': 10000,
    'lowMax': 10000,
    'lowMin': 0,
    'highMax': Infinity,
    'highMin': 50000
  };

  var adsLocal = [];
  var filterValues = {
    'type': 'any',
    'price': 'any',
    'rooms': 'any',
    'guests': 'any',
    'features': []
  };

  var copyData = function (adsBackend) {
    adsLocal = adsBackend;
    filterQualityPins(adsLocal);
  };

  window.backend.load(copyData);

  var filterQualityPins = function (someMassive) {
    var qualityPinsMassive = someMassive.slice(0, QUALITY_PINS);
    window.pin.generate(qualityPinsMassive);
  };

  var filtersAds = function (filter) {
    var filteredArray = adsLocal
    .filter(function (element, i, array) {
      if (filter.type === 'any') {
        return array;
      } else {
        return element.offer.type === filter.type;
      }
    })
    .filter(function (element, i, array) {
      if (filter.rooms === 'any') {
        return array;
      } else {
        return element.offer.rooms.toString() === filter.rooms.toString();
      }
    })
    .filter(function (element, i, array) {
      if (filter.guests === 'any') {
        return array;
      } else {
        return element.offer.guests.toString() === filter.guests.toString();
      }
    })
    .filter(function (element, i, array) {
      if (filter.price === 'any') {
        return array;
      } else {
        return element.offer.price >= priseStringToPriseNumber[filter.price + 'Min'] && element.offer.price <= priseStringToPriseNumber[filter.price + 'Max'];
      }
    })
    .filter(function (element, i, array) {
      if (filter.features.length === 0) {
        return array;
      } else {
        var isAllFeatures = true;
        filter.features.forEach(function (item) {
          isAllFeatures *= element.offer.features.includes(item);
        });
        return isAllFeatures;
      }
    });
    filterQualityPins(filteredArray);
    updatePins();
  };

  var mapFiltersChangeHandler = function () {
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }
  };

  mapFilters.addEventListener('change', mapFiltersChangeHandler);

  var updatePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    mapPins.appendChild(window.pin.return);
  };

  mapFilters.addEventListener('change', function (evt) {
    if (evt.target.name === 'features') {
      filterValues.features = [];
      var checkedFeatures = document.querySelectorAll('.map__checkbox:checked');
      checkedFeatures.forEach(function (item) {
        filterValues.features.push(item.value);
      });
    } else {
      var name = imputNameToArrayName[evt.target.name];
      filterValues[name] = evt.target.value;
    }
    setTimeout(filtersAds, DEBOUNCE_INTERVAL, filterValues);
  });

})();
