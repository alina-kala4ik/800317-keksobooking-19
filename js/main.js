'use strict';

(function () {

  var ads = [];

  var TYPES = ['palace', 'flat', 'house', 'bungalo'];

  var CHECK_TIMES = ['12:00', '13:00', '14:00'];

  var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var features = [];

  var ALL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var photos = [];

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var allForms = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filters select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var ENTER_KEY = 'Enter';
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var MAP_PIN_SIZE = 65;
  var MAP_PIN_HEIGHT_ARROW = 19;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');

  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var generateFeatures = function () {
    for (var i = 0; i < randomInteger(0, 6); i++) {
      features[i] = ALL_FEATURES[i];
    }
    return features;
  };

  var generatePhotos = function () {
    for (var i = 0; i < randomInteger(0, 3); i++) {
      photos[i] = ALL_PHOTOS[i];
    }
    return photos;
  };

  var generateAds = function (i) {
    var checkTime = CHECK_TIMES[randomInteger(0, 2)];
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'описание',
        'address': '600, 350',
        'price': randomInteger(30, 500),
        'type': TYPES[randomInteger(0, 3)],
        'rooms': randomInteger(1, 8),
        'guests': randomInteger(1, 5),
        'checkin': checkTime,
        'checkout': checkTime,
        'features': generateFeatures(),
        'description': 'описание',
        'photos': generatePhotos()
      },
      'location': {
        'x': randomInteger(0, 1200),
        'y': randomInteger(130, 630)
      }
    };
  };

  var generatePinElement = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - 25 + 'px';
    pinElement.style.top = ad.location.y - 70 + 'px';
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', ad.offer.title);
    fragment.appendChild(pinElement);
  };

  for (var i = 0; i < 8; i++) {
    generateAds(i);
    generatePinElement(ads[i]);
  }

  var deactivatesPage = function () {
    for (var form = 0; form < allForms.length; form++) {
      allForms[form].setAttribute('disabled', 'true');
    }
    for (var filter = 0; filter < mapFilters.length; filter++) {
      mapFilters[filter].setAttribute('disabled', 'true');
    }
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_SIZE / 2);
  };

  deactivatesPage();

  var actvatesPage = function () {
    mapPins.appendChild(fragment);
    for (var form = 0; form < allForms.length; form++) {
      allForms[form].removeAttribute('disabled');
    }
    for (var filter = 0; filter < mapFilters.length; filter++) {
      mapFilters[filter].removeAttribute('disabled');
    }
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_SIZE + MAP_PIN_HEIGHT_ARROW);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      actvatesPage();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === ENTER_KEY) {
      actvatesPage();
    }
  });

  var validatesForm = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);
    if (rooms === 1 && (guests > 1 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
    } else if (rooms === 2 && (guests > 2 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
    } else if (rooms === 3 && guests === 0) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
    } else if (rooms === 100 && guests > 0) {
      roomNumber.setCustomValidity('Нужно выбрать меньшее количество комнат');
    } else {
      roomNumber.setCustomValidity('');
    }
  };

  adForm.addEventListener('change', function () {
    validatesForm();
  });

  adFormSubmit.addEventListener('click', function () {
    validatesForm();
  });

})();
