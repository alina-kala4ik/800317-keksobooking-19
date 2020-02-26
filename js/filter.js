'use strict';

(function () {

  var QUALITY_PINS = 5;
  var DEBOUNCE_INTERVAL = 500;
  var DEFAULT_FILTER_VALUE = 'any';

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

  var filterValues = {
    'type': DEFAULT_FILTER_VALUE,
    'price': DEFAULT_FILTER_VALUE,
    'rooms': DEFAULT_FILTER_VALUE,
    'guests': DEFAULT_FILTER_VALUE,
    'features': []
  };

  var filterQualityPins = function (someMassive) {
    var qualityPinsMassive = someMassive.slice(0, QUALITY_PINS);
    window.pin.generate(qualityPinsMassive);
  };

  var filterСonditions = function (filters, arrayToFilter) {
    var filteredArray = arrayToFilter
    .filter(function (element, i, array) {
      if (filters.type === DEFAULT_FILTER_VALUE) {
        return array;
      } else {
        return element.offer.type === filters.type;
      }
    })
    .filter(function (element, i, array) {
      if (filters.rooms === DEFAULT_FILTER_VALUE) {
        return array;
      } else {
        return element.offer.rooms.toString() === filters.rooms.toString();
      }
    })
    .filter(function (element, i, array) {
      if (filters.guests === DEFAULT_FILTER_VALUE) {
        return array;
      } else {
        return element.offer.guests.toString() === filters.guests.toString();
      }
    })
    .filter(function (element, i, array) {
      if (filters.price === DEFAULT_FILTER_VALUE) {
        return array;
      } else {
        return element.offer.price >= priseStringToPriseNumber[filters.price + 'Min'] && element.offer.price <= priseStringToPriseNumber[filters.price + 'Max'];
      }
    })
    .filter(function (element, i, array) {
      if (filters.features.length === 0) {
        return array;
      } else {
        var isAllFeatures = true;
        filters.features.forEach(function (item) {
          isAllFeatures *= element.offer.features.includes(item);
        });
        return isAllFeatures;
      }
    });
    filterQualityPins(filteredArray);
    updatePins();
  };

  var updatePins = function () {
    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
    mapPins.appendChild(window.pin.return);
  };

  var mapFiltersChangeHandler = function (evt, array) {
    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }
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
    setTimeout(filterСonditions, DEBOUNCE_INTERVAL, filterValues, array);
  };

  window.filter = {
    qualityPins: filterQualityPins,
    changeHandler: mapFiltersChangeHandler
  };

})();
