'use strict';
(function () {
  window.messages = {
    success: function () {
      var successMessage = document.querySelector('.success');
      successMessage.classList.remove('hidden');
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
