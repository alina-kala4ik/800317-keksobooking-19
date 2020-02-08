'use strict';

(function () {

  var ads = window.data.ads;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  var generatePinElement = function (ad) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ad.location.x - 25 + 'px';
    pinElement.style.top = ad.location.y - 70 + 'px';
    pinElement.querySelector('img').setAttribute('src', ad.author.avatar);
    pinElement.querySelector('img').setAttribute('alt', ad.offer.title);
    pinFragment.appendChild(pinElement);
  };

  ads.forEach(function (item) {
    generatePinElement(item);
  });

  window.pin = {
    return: pinFragment
  };

})();

