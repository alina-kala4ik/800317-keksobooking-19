'use strict';

(function () {
  var URL_GET_DATA = 'https://js.dump.academy/keksobooking/data';
  var URL_SEND_FORM = 'https://js.dump.academy/keksobooking';
  var CADE_SUCCSS = 200;

  var load = function (onload) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case CADE_SUCCSS: onload(xhr.response); break;
        default: throw new Error('Ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', URL_GET_DATA);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case CADE_SUCCSS: onLoad(); break;
        default: onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError();
    });

    xhr.open('POST', URL_SEND_FORM);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    send: send
  };

})();
