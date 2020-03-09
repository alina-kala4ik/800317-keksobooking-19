'use strict';

(function () {

  var MAP_PIN_X = 570;
  var MAP_PIN_Y = 375;
  var ERROR_BORDER = '1px solid #f20000';
  var NORMAL_BORDER = '1px solid #d9d9d3';
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;
  var MIN_PRISE_FOR_BUNGALO = 0;
  var MIN_PRISE_FOR_FLAT = 1000;
  var MIN_PRISE_FOR_HOUSE = 5000;
  var MIN_PRISE_FOR_PALACE = 10000;
  var START_COORDS_X_MAP_PIN_MAIN = '570px';
  var START_COORDS_Y_MAP_PIN_MAIN = '375px';

  var main = document.querySelector('main');
  var allForms = main.querySelectorAll('fieldset');
  var mapFilters = main.querySelectorAll('.map__filters select');

  var map = main.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');

  var adForm = main.querySelector('.ad-form');
  var adTitle = adForm.querySelector('#title');
  var address = adForm.querySelector('#address');
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var priceHousing = adForm.querySelector('#price');
  var checkin = adForm.querySelector('#timein');
  var checkout = adForm.querySelector('#timeout');
  var typeHousing = adForm.querySelector('#type');
  var adFormReset = adForm.querySelector('.ad-form__reset');
  var fileChooserPhoto = adForm.querySelector('.ad-form__upload input[type=file]');
  var fileChooserAvatar = adForm.querySelector('.ad-form__field input[type=file]');
  var previewPhoto = adForm.querySelector('.ad-form__photo');
  var previewAvatar = adForm.querySelector('.ad-form-header__preview img');


  var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');

  var filtersForm = main.querySelector('.map__filters');

  var adsLocal = [];

  var copyData = function (adsBackend) {
    adsLocal = adsBackend;
    returnPins();
  };

  var returnPins = function () {
    window.filter.qualityPins(adsLocal);
    mapPins.appendChild(window.pin.return);
  };

  var validatesTitle = function () {
    adTitle.setAttribute('required', true);
    adTitle.setAttribute('minlength', MIN_LENGTH_TITLE);
    adTitle.setAttribute('maxlength', MAX_LENGTH_TITLE);
    if (!adTitle.checkValidity()) {
      adTitle.style.border = ERROR_BORDER;
    }
  };

  var validatesRoomsAndGuests = function () {
    var rooms = Number(roomNumber.value);
    var guests = Number(capacity.value);
    if (rooms === 1 && (guests > 1 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат для указанного количества гостей');
    } else if (rooms === 2 && (guests > 2 || guests === 0)) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат для указанного количества гостей');
    } else if (rooms === 3 && guests === 0) {
      roomNumber.setCustomValidity('Нужно выбрать большее количество комнат для указанного количества гостей');
    } else if (rooms === 100 && guests > 0) {
      roomNumber.setCustomValidity('Нужно выбрать меньшее количество комнат для указанного количества гостей');
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
      priceHousing.setAttribute('placeholder', MIN_PRISE_FOR_BUNGALO);
      priceHousing.setAttribute('min', MIN_PRISE_FOR_BUNGALO);
    } else if (target.value === 'flat') {
      priceHousing.setAttribute('placeholder', MIN_PRISE_FOR_FLAT);
      priceHousing.setAttribute('min', MIN_PRISE_FOR_FLAT);
    } else if (target.value === 'house') {
      priceHousing.setAttribute('placeholder', MIN_PRISE_FOR_HOUSE);
      priceHousing.setAttribute('min', MIN_PRISE_FOR_HOUSE);
    } else if (target.value === 'palace') {
      priceHousing.setAttribute('placeholder', MIN_PRISE_FOR_PALACE);
      priceHousing.setAttribute('min', MIN_PRISE_FOR_PALACE);
    }
  };

  var validatePrise = function () {
    priceHousing.setAttribute('required', true);
    if (!priceHousing.checkValidity()) {
      priceHousing.style.border = ERROR_BORDER;
    }
    if (typeHousing === 'bungalo' && priceHousing < MIN_PRISE_FOR_BUNGALO) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'flat' && priceHousing < MIN_PRISE_FOR_FLAT) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'house' && priceHousing < MIN_PRISE_FOR_HOUSE) {
      priceHousing.style.border = ERROR_BORDER;
    } else if (typeHousing === 'palace' && priceHousing < MIN_PRISE_FOR_PALACE) {
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
    deactivatesPage();

    adForm.reset();
    filtersForm.reset();
    priceHousing.setAttribute('placeholder', MIN_PRISE_FOR_FLAT);

    var allPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    allPins.forEach(function (item) {
      item.parentNode.removeChild(item);
    });

    var unnecessaryMapCard = document.querySelector('.map__card');
    if (unnecessaryMapCard) {
      unnecessaryMapCard.parentNode.removeChild(unnecessaryMapCard);
    }

    mapPinMain.style.left = START_COORDS_X_MAP_PIN_MAIN;
    mapPinMain.style.top = START_COORDS_Y_MAP_PIN_MAIN;

    address.value = Math.ceil(MAP_PIN_X + window.util.MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + window.util.MAP_PIN_SIZE / 2);

    previewPhoto.style.backgroundImage = 'none';
    previewAvatar.setAttribute('src', 'img/muffin-grey.svg');
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

  var filtersFormChangeHandler = function (evt) {
    window.filter.changeHandler(evt, adsLocal);
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

    filtersForm.removeEventListener('change', filtersFormChangeHandler);
  };

  deactivatesPage();

  var activatesPage = function () {
    window.backend.load(copyData);

    allForms.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    mapFilters.forEach(function (item) {
      item.removeAttribute('disabled');
    });
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    address.value = Math.ceil(MAP_PIN_X + window.util.MAP_PIN_SIZE / 2) + ', ' + Math.ceil(MAP_PIN_Y + window.util.MAP_PIN_SIZE + window.util.MAP_PIN_HEIGHT_ARROW);

    adForm.addEventListener('change', synchronizesCheckTime);
    adForm.addEventListener('change', synchronizesPriseAndType);
    adForm.addEventListener('change', validatesRoomsAndGuests);
    adForm.addEventListener('input', removeErrorBorder);
    adFormReset.addEventListener('click', resetForm);
    adForm.addEventListener('submit', adFormSubmitHandler);

    fileChooserPhoto.addEventListener('change', window.photo.house);
    fileChooserAvatar.addEventListener('change', window.photo.avatar);

    filtersForm.addEventListener('change', filtersFormChangeHandler);
  };

})();
