'use strict';

(function () {
  var URL_GET_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND_FORM = 'https://js.dump.academy/keksobooking';
  var CADE_SUCCESS = 200;

  var getNewRequest = function (url, typeRequest, functionLoad, functionError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === CADE_SUCCESS) {
        functionLoad(xhr.response);
      } else if (functionError) {
        functionError();
      } else {
        throw new Error('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      if (functionError) {
        functionError();
      } else {
        throw new Error('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open(typeRequest, url);
    xhr.send(data);
  };

  var load = function (onload) {
    getNewRequest(URL_GET_DATA, 'GET', onload);
  };

  var send = function (data, onLoad, onError) {
    getNewRequest(URL_SEND_FORM, 'POST', onLoad, onError, data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
