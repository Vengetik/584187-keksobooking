'use strict';
(function () {

  var avatarInputField = document.querySelector('.ad-form input[name="avatar"]');
  var avatarElement = document.querySelector('.ad-form-header__preview img');
  var inputField = document.querySelector('.ad-form input[name="images"');
  var photoBoxElement = document.querySelector('.ad-form__photo');

  var checkFileOnImg = function (file) {
    var fileName = file.name.toLowerCase();

    return window.constant.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  };
  var renderImage = function (file, elem) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      elem.src = reader.result;
    });

    reader.readAsDataURL(file);
  };
  var createHousePhotoFragment = function (elem) {
    var fragment = document.createDocumentFragment();

    elem.files.forEach(function (file) {

      if (checkFileOnImg(file)) {
        var imgElement = document.createElement('img');

        renderImage(file, imgElement);

        imgElement.width = window.constant.Image.WIDTH;
        imgElement.height = window.constant.Image.HEIGHT;
        imgElement.alt = window.constant.Image.ALT;
        imgElement.style.margin = window.constant.Image.MARGIN;

        fragment.appendChild(imgElement);
      }
    });
    return fragment;
  };

  avatarInputField.addEventListener('change', function () {
    renderImage(avatarInputField.files[0], avatarElement);
  });
  inputField.addEventListener('change', function () {
    photoBoxElement.appendChild(createHousePhotoFragment(inputField));
  });
})();
