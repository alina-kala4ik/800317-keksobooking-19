'use strict';

(function () {

  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var ERROR_BORDER = '1px solid #f20000';
  var NORMAL_BORDER = '1px solid #d9d9d3';

  var allForms = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelectorAll('.map__filters select');
  var mapPinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adTitle = adForm.querySelector('#title');
  var address = document.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var adFormSubmit = adForm.querySelector('.ad-form__submit');
  var priceHousing = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var validatesTitle = function () {
    if (!adTitle.checkValidity()) {
      adTitle.style.border = ERROR_BORDER;
    }
  };

  var validatesFormRoomsAndGuests = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);
    if (rooms === 1 && (guests > 1 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 2 && (guests > 2 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 3 && guests === 0) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат');
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 100 && guests > 0) {
      roomNumber.setCustomValidity('Нужно выбрать меньшее количество комнат');
      roomNumber.style.border = ERROR_BORDER;
    } else {
      roomNumber.setCustomValidity('');
      roomNumber.style.border = NORMAL_BORDER;
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

  var selectInvalidFormPrise = function () {
    if (!priceHousing.checkValidity()) {
      priceHousing.style.border = ERROR_BORDER;
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

  var removeErrorBorder = function (evt) {
    evt.target.style.border = NORMAL_BORDER;
  };

  var resetForm = function () {
    adForm.reset();
    priceHousing.setAttribute('placeholder', '5000');
    address.value = Math.ceil(MAP_PIN_X + window.util.MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + window.util.MAP_PIN_SIZE / 2);
  };

  var successSend = function () {
    deactivatesPage();

    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.classList.add('hidden');
    });

    var popup = document.querySelector('.popup');
    if (popup) {
      popup.parentNode.removeChild(popup);
    }

    resetForm();

    var successMessage = successMessageTemplate.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', successMessage);

    var closeSuccessMessage = function () {
      successMessage.parentNode.removeChild(successMessage);
    };

    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, closeSuccessMessage);
      document.body.removeEventListener('click', bodyClickHandler);
    };

    var bodyClickHandler = function () {
      closeSuccessMessage();
      document.body.removeEventListener('keydown', escKeydownHandler);
    };

    document.body.addEventListener('keydown', escKeydownHandler, {once: true});
    document.body.addEventListener('click', bodyClickHandler, {once: true});
  };

  var errorSend = function () {
    var errorMessage = errorMessageTemplate.cloneNode(true);
    main.insertAdjacentElement('afterbegin', errorMessage);

    var errorButton = document.querySelector('.error__button');

    var closeErrorMessage = function () {
      errorMessage.parentNode.removeChild(errorMessage);
      document.body.removeEventListener('click', closeErrorMessage);
    };

    var bodyClickHandler = function () {
      closeErrorMessage();
      document.body.removeEventListener('keydown', escKeydownHandler);
      errorButton.removeEventListener('click', errorButtonClickHandler);

    };

    var escKeydownHandler = function (evt) {
      window.util.isEscEvent(evt, closeErrorMessage);
      document.body.removeEventListener('click', bodyClickHandler);
      errorButton.removeEventListener('click', errorButtonClickHandler);
    };

    var errorButtonClickHandler = function () {
      closeErrorMessage();
      document.body.removeEventListener('click', bodyClickHandler);
      document.body.removeEventListener('keydown', escKeydownHandler);
    };

    document.body.addEventListener('click', bodyClickHandler, {once: true});
    document.body.addEventListener('keydown', escKeydownHandler, {once: true});
    errorButton.addEventListener('click', errorButtonClickHandler, {once: true});
  };

  var adFormSubmitHandler = function (evt) {
    evt.preventDefault();
    window.backend.send(new FormData(adForm), successSend, errorSend);
  };

  var deactivatesPage = function () {
    allForms.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    mapFilters.forEach(function (item) {
      item.setAttribute('disabled', 'true');
    });
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    address.value = Math.ceil(MAP_PIN_X + window.util.MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + window.util.MAP_PIN_SIZE / 2);

    var mapPinMainMousedownHandler = function (evt) {
      window.util.isMainButtonMouseEvent(evt, activatesPage);
      mapPinMain.removeEventListener('keydown', mapPinMainKeydownHandler);
    };

    var mapPinMainKeydownHandler = function (evt) {
      window.util.isEnterEvent(evt, activatesPage);
      mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    };

    mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler, {once: true});
    mapPinMain.addEventListener('keydown', mapPinMainKeydownHandler, {once: true});

    adForm.removeEventListener('change', synchronizesCheckTime);
    adForm.removeEventListener('change', validatesFormPrice);
    adFormSubmit.removeEventListener('click', validatesTitle);
    adFormSubmit.removeEventListener('click', validatesFormRoomsAndGuests);
    adFormSubmit.removeEventListener('click', validatesFormPrice);
    adFormSubmit.removeEventListener('click', selectInvalidFormPrise);
    adForm.removeEventListener('input', removeErrorBorder);
    adFormReset.removeEventListener('click', resetForm);
    adForm.removeEventListener('submit', adFormSubmitHandler);
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
    address.value = Math.ceil(MAP_PIN_X + window.util.MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + window.util.MAP_PIN_SIZE + window.util.MAP_PIN_HEIGHT_ARROW);

    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.classList.remove('hidden');
    });

    adForm.addEventListener('change', synchronizesCheckTime);
    adForm.addEventListener('change', validatesFormPrice);
    adFormSubmit.addEventListener('click', validatesTitle);
    adFormSubmit.addEventListener('click', validatesFormRoomsAndGuests);
    adFormSubmit.addEventListener('click', validatesFormPrice);
    adFormSubmit.addEventListener('click', selectInvalidFormPrise);
    adForm.addEventListener('input', removeErrorBorder);
    adFormReset.addEventListener('click', resetForm);
    adForm.addEventListener('submit', adFormSubmitHandler);
  };

})();
