'use strict';

(function () {

  var ads = window.data.ads;
  var cardFragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var popupTypeTranslate = function (ad) {
    var swap;
    switch (ads[ad].offer.type) {
      case 'flat': swap = 'Квартира'; break;
      case 'bungalo': swap = 'Бунгало'; break;
      case 'house': swap = 'Дом'; break;
      case 'palace': swap = 'Дворец'; break;
      default: swap = 'Неизвестно'; break;
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
        cardFragment.appendChild(newPhoto);
      }
      photosWrapper.appendChild(cardFragment);
    }
  };

  var returnCard = function (ad) {
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
    cardFragment.appendChild(cardElement);
    return cardFragment;
  };

  window.card = {
    return: returnCard
  };

})();
