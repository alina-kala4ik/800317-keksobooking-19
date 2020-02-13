'use strict';

(function () {

  var AD_PIN_HEIGHT = 70;
  var AD_PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  var generatePinElement = function (ad) {
    for (var i = 0; i < ad.length; i++) {
      if (ad[i].offer !== undefined) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style.left = ad[i].location.x - (AD_PIN_WIDTH / 2) + 'px';
        pinElement.style.top = ad[i].location.y - AD_PIN_HEIGHT + 'px';
        pinElement.querySelector('img').setAttribute('src', ad[i].author.avatar);
        pinElement.querySelector('img').setAttribute('alt', ad[i].offer.title);
        pinElement.setAttribute('data-i', i);
        pinFragment.appendChild(pinElement);
      }
    }
  };

  window.backend.load(generatePinElement);

  window.pin = {
    return: pinFragment
  };

})();
