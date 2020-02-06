'use strict';

(function () {

  var MAP_PIN_SIZE = 65;
  var MAP_PIN_HEIGHT_ARROW = 19;
  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;

  var allForms = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filters select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var address = document.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var priceHousing = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');

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

  var validatesFormPrice = function (evt) {
    var target = evt.target;
    if (target.value === 'bungalo') {
      priceHousing.setAttribute('placeholder', '0');
      priceHousing.setAttribute('min', '0');
    } else if (target.value === 'flat') {
      priceHousing.setAttribute('placeholder', '1000');
      priceHousing.setAttribute('min', '1000');
    } else if (target.value === 'house') {
      priceHousing.setAttribute('placeholder', '5000');
      priceHousing.setAttribute('min', '5000');
    } else if (target.value === 'palace') {
      priceHousing.setAttribute('placeholder', '10000');
      priceHousing.setAttribute('min', '10000');
    }
  };

  var synchronizesCheckTime = function (evt) {
    var target = evt.target;
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
  };

  deactivatesPage();

  var activatesPage = function () {
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
      synchronizesCheckTime(evt);
      validatesFormPrice(evt);
    });

    adFormSubmit.addEventListener('click', validatesFormRoomsAndGuests);
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    window.util.isMainButtonMouseEvent(evt, activatesPage);
  }, {once: true});

  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activatesPage);
  }, {once: true});

})();
