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
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filtersContainer = document.querySelector('.map__filters-container');
  var priceHousing = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');

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

  // Отрисовка объявления

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

  // настройка активной страницы

  var validatesFormRoomsAndGuests = function () {
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

  var validatesFormPrise = function (evt) {
    var target = evt.target;
    if (target.value === 'bungalo') {
      priceHousing.setAttribute('min', '0');
    } else if (target.value === 'flat') {
      priceHousing.setAttribute('min', '1000');
    } else if (target.value === 'house') {
      priceHousing.setAttribute('min', '5000');
    } else if (target.value === 'palace') {
      priceHousing.setAttribute('min', '10000');
    }
  };

  var changePrisePlaceholder = function (evt) {
    var target = evt.target;
    if (target.value === 'bungalo') {
      priceHousing.setAttribute('placeholder', '0');
    } else if (target.value === 'flat') {
      priceHousing.setAttribute('placeholder', '1000');
    } else if (target.value === 'house') {
      priceHousing.setAttribute('placeholder', '5000');
    } else if (target.value === 'palace') {
      priceHousing.setAttribute('placeholder', '10000');
    }
  };

  var synchronizesCheckTime = function (evt) {
    var target = evt.target
    if (target.value === '12:00') {
      checkin.value = '12:00';
      checkout.value = '12:00';
    } else if (target.value === '13:00') {
      checkin.value = '13:00';
      checkout.value = '13:00';
    } else if (target.value === '14:00') {
      checkin.value = '14:00';
      checkout.value = '14:00';
    }
  };

  var deactivatesPage = function () {
    allForms.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    mapFilters.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_SIZE / 2);

    mapPinMain.addEventListener('mousedown', function (evt) {
      if (evt.button === 0) {
        activatesPage();
      }
    });

    mapPinMain.addEventListener('keydown', function (evt) {
      if (evt.key === ENTER_KEY) {
        activatesPage();
      }
    });

  };

  deactivatesPage();

  var activatesPage = function (evt) {
    mapPins.appendChild(fragment);
    map.insertBefore(fragment, filtersContainer);
    allForms.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFilters.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = Math.ceil(MAP_PIN_X + MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + MAP_PIN_SIZE + MAP_PIN_HEIGHT_ARROW);

    adForm.addEventListener('change', function (evt) {
      validatesFormRoomsAndGuests();
      changePrisePlaceholder(evt);
      synchronizesCheckTime(evt);
      validatesFormPrise(evt);
    });

    adFormSubmit.addEventListener('click', validatesFormRoomsAndGuests);
  }

})();
