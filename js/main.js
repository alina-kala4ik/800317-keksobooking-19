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
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var map = document.querySelector('.map');
  var filtersContainer = document.querySelector('.map__filters-container');


  var fragment = document.createDocumentFragment();

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

  var popupTypeTranslate = function (ad) {
    var swap;
    switch (ads[ad].offer.type) {
      case 'flat': swap = 'Квартира'; break;
      case 'bungalo': swap = 'Бунгало'; break;
      case 'house': swap = 'Дом'; break;
      case 'palace': swap = 'Дворец'; break;
    }
    return swap;
  };

  var renderPopupFeatures = function (ad, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var featuresTemplate = popupFeatures.querySelectorAll('.popup__feature');

    if (ads[ad].offer.features.length === 0) {
      popupFeatures.style.display = 'none';
    } else {
      for (var y = 0; y < featuresTemplate.length; y++) {
        if (!featuresTemplate[y].classList.contains('popup__feature--' + ads[ad].offer.features[y])) {
          featuresTemplate[y].style.display = 'none';
        }
      }
    }
  };

  var renderPopupPhotos = function (ad, cardElement) {
    var photosWrapper = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');

    if (ads[ad].offer.photos.length === 0) {
      photosWrapper.style.display = 'none';
    } else {
      photoTemplate.setAttribute('src', ads[ad].offer.photos[0]);
      for (var x = ads[ad].offer.photos.length; x > 1; x--) {
        var newPhoto = photoTemplate.cloneNode(true);
        newPhoto.setAttribute('src', ads[ad].offer.photos[x - 1]);
        fragment.appendChild(newPhoto);
      }
      photosWrapper.appendChild(fragment);
    }
  };

  var returnMap = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = ads[ad].offer.title;
    cardElement.querySelector('.popup__text--address').textContent = ads[ad].offer.address;
    cardElement.querySelector('.popup__text--price').textContent = ads[ad].offer.price + ' ₽/ночь';
    cardElement.querySelector('.popup__type').textContent = popupTypeTranslate(ad);
    cardElement.querySelector('.popup__text--capacity').textContent = ads[ad].offer.rooms + ' комнаты для ' + ads[ad].offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ads[ad].offer.checkin + ', выезд до ' + ads[ad].offer.checkout;
    renderPopupFeatures(ad, cardElement);
    cardElement.querySelector('.popup__description').textContent = ads[ad].offer.description;
    renderPopupPhotos(ad, cardElement);
    cardElement.querySelector('.popup__avatar').setAttribute('src', ads[ad].author.avatar);
    fragment.appendChild(cardElement);
    return fragment;
  };

  returnMap(0);
  map.insertBefore(fragment, filtersContainer);

})();
