'use strict';

(function () {

  var ads = [];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var ALL_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var features = [];
  var ALL_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var photos = [];
  var randomInteger = window.util.randomInteger;

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
    var locationX = randomInteger(0, 1200);
    var locationY = randomInteger(130, 630);
    ads[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'
      },
      'offer': {
        'title': 'описание',
        'address': locationX + ', ' + locationY,
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
        'x': locationX,
        'y': locationY
      }
    };
  };

  for (var i = 0; i < 8; i++) {
    generateAds(i);
  }

  window.data = {
    ads: ads
  };

})();
