'use strict';

(function () {

  var AD_PIN_HEIGHT = 70;
  var AD_PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  var generatePinElement = function (ad, i) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - (AD_PIN_WIDTH / 2) + 'px';
    pinElement.style.top = ad.location.y - AD_PIN_HEIGHT + 'px';
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', ad.offer.title);
    pinElement.setAttribute('data-i', i);
    pinFragment.appendChild(pinElement);
  };

  window.backend.load(generatePinElement);

  window.pin = {
    return: pinFragment
  };

})();
