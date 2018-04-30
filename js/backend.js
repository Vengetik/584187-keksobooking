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
    xhr.timeout = 10000;
  };

  window.backend = {
    upload: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkLoad(xhr, onLoad, onError);

      xhr.open('POST', window.const.Url.UPLOAD);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      checkLoad(xhr, onLoad, onError, 10000);

      xhr.open('GET', window.const.Url.DATA);
      xhr.send();
    }
  };
})();
