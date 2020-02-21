'use strict';

(function () {

  var cardFragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var renderTitle = function (ad, cardElement) {
    if (ad.offer.title === undefined) {
      cardElement.querySelector('.popup__title').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__title').textContent = ad.offer.title;
    }
  };

  var renderAddress = function (ad, cardElement) {
    if (ad.offer.address === undefined) {
      cardElement.querySelector('.popup__text--address').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    }
  };

  var renderPrice = function (ad, cardElement) {
    if (ad.offer.price === undefined) {
      cardElement.querySelector('.popup__text--price').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__text--price').textContent = ad.offer.price + ' ₽/ночь';
    }
  };

  var renderType = function (ad, cardElement) {
    if (ad.offer.type === undefined) {
      cardElement.querySelector('.popup__type').style.display = 'none';
    } else {
      var swap;
      switch (ad.offer.type) {
        case 'flat': swap = 'Квартира'; break;
        case 'bungalo': swap = 'Бунгало'; break;
        case 'house': swap = 'Дом'; break;
        case 'palace': swap = 'Дворец'; break;
        default: swap = 'Неизвестно'; break;
      }
      cardElement.querySelector('.popup__type').textContent = swap;
    }
  };

  var renderNumberRoomsAndGuests = function (ad, cardElement) {
    if (ad.offer.rooms === undefined || ad.offer.guests === undefined) {
      cardElement.querySelector('.popup__text--capacity').style.display = 'none';
    } else {
      var room;
      switch (ad.offer.rooms) {
        case '1': room = '1 комната'; break;
        case '2': room = '2 комнаты'; break;
        case '3': room = '3 комнаты'; break;
        case '100': room = '100 комнат'; break;
        default: room = ad.offer.rooms + ' комнат';
      }
      var guest;
      switch (ad.offer.guests) {
        case '1': guest = 'для 1 гостя'; break;
        case '2': guest = 'для 2 гостей'; break;
        case '3': guest = 'для 3 гостей'; break;
        case '0': guest = 'не для гостей'; break;
        default: guest = 'для ' + ad.offer.guests + ' гостей';
      }
      cardElement.querySelector('.popup__text--capacity').textContent = room + ' ' + guest;
    }
  };

  var renderCheckTimes = function (ad, cardElement) {
    if (ad.offer.checkin === undefined || ad.offer.checkout === undefined) {
      cardElement.querySelector('.popup__text--time').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    }
  };

  var renderFeatures = function (ad, cardElement) {
    var popupFeatures = cardElement.querySelector('.popup__features');
    var featuresTemplate = popupFeatures.querySelectorAll('.popup__feature');

    if (ad.offer.features.length === 0) {
      popupFeatures.style.display = 'none';
    } else {
      featuresTemplate.forEach(function (item) {
        item.style.display = 'none';
      });
      ad.offer.features.forEach(function (item) {
        var selector = '.popup__feature--' + item;
        popupFeatures.querySelector(selector).style.display = 'inline-block';
      });
    }
  };

  var renderDescription = function (ad, cardElement) {
    if (ad.offer.description === undefined) {
      cardElement.querySelector('.popup__description').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__description').textContent = ad.offer.description;
    }
  };

  var renderPopupPhotos = function (ad, cardElement) {
    var photosWrapper = cardElement.querySelector('.popup__photos');
    var photoTemplate = cardElement.querySelector('.popup__photo');

    if (ad.offer.photos.length === 0) {
      photosWrapper.style.display = 'none';
    } else {
      photoTemplate.setAttribute('src', ad.offer.photos[0]);
      for (var x = ad.offer.photos.length; x > 1; x--) {
        var newPhoto = photoTemplate.cloneNode(true);
        newPhoto.setAttribute('src', ad.offer.photos[x - 1]);
        cardFragment.appendChild(newPhoto);
      }
      photosWrapper.appendChild(cardFragment);
    }
  };

  var returnAvatar = function (ad, cardElement) {
    if (ad.author.avatar === undefined) {
      cardElement.querySelector('.popup__avatar').style.display = 'none';
    } else {
      cardElement.querySelector('.popup__avatar').setAttribute('src', ad.author.avatar);
    }
  };

  var returnCard = function (ad) {
    var cardElement = cardTemplate.cloneNode(true);
    renderTitle(ad, cardElement);
    renderAddress(ad, cardElement);
    renderPrice(ad, cardElement);
    renderType(ad, cardElement);
    renderNumberRoomsAndGuests(ad, cardElement);
    renderCheckTimes(ad, cardElement);
    renderFeatures(ad, cardElement);
    renderDescription(ad, cardElement);
    renderPopupPhotos(ad, cardElement);
    returnAvatar(ad, cardElement);
    cardFragment.appendChild(cardElement);
    return cardFragment;
  };

  window.card = {
    return: returnCard
  };

})();
