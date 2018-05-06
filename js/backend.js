'use strict';
(function () {
  var checkLoad = function (xhr, onLoad, onError) {

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс.');
    });
    xhr.timeout = window.constant.RESPONSE_TIMEOUT;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkLoad(xhr, onLoad, onError);

      xhr.open('POST', window.constant.Url.UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkLoad(xhr, onLoad, onError, window.constant.RESPONSE_TIMEOUT);

      xhr.open('GET', window.constant.Url.DATA);
      xhr.send();
    }
  };
})();
