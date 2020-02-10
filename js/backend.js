'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  var load = function (onload) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onload(xhr.response);
    });

    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };

})();
