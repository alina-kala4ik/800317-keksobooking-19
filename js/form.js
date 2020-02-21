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
  var priceHousing = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');
  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var typeHousing = adForm.querySelector('#type');

  var validatesTitle = function () {
    adTitle.setAttribute('required', true);
    adTitle.setAttribute('minlength', '30');
    adTitle.setAttribute('maxlength', '100');
    if (!adTitle.checkValidity()) {
      adTitle.style.border = ERROR_BORDER;
    }
  };


  var validatesRoomsAndGuests = function () {
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
      roomNumber.style.border = NORMAL_BORDER;
    }
  };

  var selectInvalidRoom = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);
    if (rooms === 1 && (guests > 1 || guests === 0)) {
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 2 && (guests > 2 || guests === 0)) {
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 3 && guests === 0) {
      roomNumber.style.border = ERROR_BORDER;
    } else if (rooms === 100 && guests > 0) {
      roomNumber.style.border = ERROR_BORDER;
    }
  };

  var synchronizesPriseAndType = function (evt) {
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

  var validatePrise = function () {
    priceHousing.setAttribute('required', true);
    if (!priceHousing.checkValidity()) {
      priceHousing.style.border = ERROR_BORDER;
    }
    if (typeHousing === 'bungalo' && priceHousing < 0) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'flat' && priceHousing < 1000) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'house' && priceHousing < 5000) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'palace' && priceHousing < 10000) {
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
    validatesTitle();
    validatePrise();
    selectInvalidRoom();
    if (roomNumber.checkValidity() && priceHousing.checkValidity() && adTitle.checkValidity()) {
      window.backend.send(new FormData(adForm), successSend, errorSend);
    }
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
    adForm.removeEventListener('change', synchronizesPriseAndType);
    adForm.removeEventListener('change', validatesRoomsAndGuests);
    adForm.removeEventListener('input', removeErrorBorder);
    adFormReset.removeEventListener('click', resetForm);
    adForm.removeEventListener('submit', adFormSubmitHandler);

    fileChooserPhoto.removeEventListener('change', window.photo.house);
    fileChooserAvatar.removeEventListener('change', window.photo.avatar);
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
    adForm.addEventListener('change', synchronizesPriseAndType);
    adForm.addEventListener('change', validatesRoomsAndGuests);
    adForm.addEventListener('input', removeErrorBorder);
    adFormReset.addEventListener('click', resetForm);
    adForm.addEventListener('submit', adFormSubmitHandler);

    fileChooserPhoto.addEventListener('change', window.photo.house);
    fileChooserAvatar.addEventListener('change', window.photo.avatar);
  };

})();
