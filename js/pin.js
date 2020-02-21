'use strict';

(function () {

  var AD_PIN_HEIGHT = 70;
  var AD_PIN_WIDTH = 50;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinFragment = document.createDocumentFragment();

  var generatePinElement = function (ads) {
    ads.forEach(function (item, i) {
      if (item.offer !== undefined) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style.left = item.location.x - (AD_PIN_WIDTH / 2) + 'px';
        pinElement.style.top = item.location.y - AD_PIN_HEIGHT + 'px';
        pinElement.querySelector('img').setAttribute('src', item.author.avatar);
        pinElement.querySelector('img').setAttribute('alt', item.offer.title);
        pinElement.setAttribute('data-i', i);

        pinElement.addEventListener('click', function () {
          window.map.openPopup(pinElement, item);
        });

        pinElement.addEventListener('keydown', function (evt) {
          if (evt.key === window.util.ENTER_KEY) {
            window.map.openPopup(pinElement, item);
          }
        });

        pinFragment.appendChild(pinElement);
      }
    });
  };

  // window.backend.load(generatePinElement);

  window.pin = {
    return: pinFragment,
    generate: generatePinElement
  };

})();
