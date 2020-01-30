'use strict';

(function () {

  document.querySelector('.map').classList.remove('map--faded');

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

  var randomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  var generateFeatures = function () {
    for (var i = 0; i < randomInteger(0, 5); i++) {
      features[i] = ALL_FEATURES[i];
    }
    return features;
  };

  var generatePhotos = function () {
    for (var i = 0; i < randomInteger(0, 2); i++) {
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
    }
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

  mapPins.appendChild(fragment);

})();
