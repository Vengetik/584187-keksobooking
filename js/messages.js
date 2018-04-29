'use strict';
(function () {
  window.messages = {
    success: function () {
      var successBlock = document.querySelector('.success');
      successBlock.classList.remove('hidden');
      document.addEventListener('keydown', function (evt) {
        if (
          evt.keyCode === window.util.ESC_BUTTON ||
          evt.keyCode === window.util.ENTER_BUTTON ||
          evt.keyCode === window.util.SPACE_BUTTON
        ) {
          successBlock.classList.add('hidden');
        }
      });
      document.addEventListener('click', function onDocSuccessBlockClose() {
        successBlock.classList.add('hidden');
        document.removeEventListener('click', onDocSuccessBlockClose);
      });
    },

    error: function (errorMessage) {
      var errorElement = document.createElement('div');

      errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: black; color: red;';
      errorElement.style.position = 'fixed';
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';

      errorElement.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorElement);
    }
  };
})();
