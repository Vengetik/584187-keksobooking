'use strict';
(function () {

  var avatarInput = document.querySelector('.ad-form input[name="avatar"]');
  var avatar = document.querySelector('.ad-form-header__preview img');
  var photoInput = document.querySelector('.ad-form input[name="images"]');
  var photoBox = document.querySelector('.ad-form__photo');
  var avatarDropZone = document.querySelector('.ad-form-header__drop-zone');
  var photoDropZone = document.querySelector('.ad-form__drop-zone');

  var draggedItemElement;

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
  var createHousingPhotosFragment = function (element) {
    var fragment = document.createDocumentFragment();

    Array.from(element.files).forEach(function (file) {

      if (checkFileOnImg(file)) {
        var imgElement = document.createElement('img');

        renderImage(file, imgElement);

        imgElement.width = window.constant.Image.WIDTH;
        imgElement.height = window.constant.Image.HEIGHT;
        imgElement.alt = window.constant.Image.ALT;
        imgElement.draggable = true;
        imgElement.style.margin = window.constant.Image.MARGIN;

        fragment.appendChild(imgElement);
      }
    });
    return fragment;
  };

  avatarInput.addEventListener('change', function () {
    renderImage(avatarInput.files[0], avatar);
  });
  avatarDropZone.addEventListener('dragenter', function (evt) {
    evt.target.style.outline = '2px solid red';
    evt.preventDefault();
  });
  avatarDropZone.addEventListener('dragleave', function (evt) {
    evt.target.style.outline = '';
    evt.preventDefault();
  });
  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  avatarDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    evt.target.style.outline = '';

    renderImage(evt.dataTransfer.files[0], avatar);
  });

  photoInput.addEventListener('change', function () {
    photoBox.appendChild(createHousingPhotosFragment(photoInput));
  });
  photoDropZone.addEventListener('dragenter', function (evt) {
    evt.target.style.outline = '2px solid red';
    evt.preventDefault();
  });
  photoDropZone.addEventListener('dragleave', function (evt) {
    evt.target.style.outline = '';
    evt.preventDefault();
  });
  photoDropZone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  photoDropZone.addEventListener('drop', function (evt) {
    evt.preventDefault();

    evt.target.style.outline = '';

    var files = evt.dataTransfer;

    photoBox.appendChild(createHousingPhotosFragment(files));
  });

  photoBox.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName === 'IMG') {
      draggedItemElement = evt.target;
    }
  });
  photoBox.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });
  photoBox.addEventListener('drop', function (evt) {
    var target = evt.target;
    if (target.tagName === 'IMG') {
      if (target.offsetTop === draggedItemElement.offsetTop) {
        if (target.offsetLeft < draggedItemElement.offsetLeft) {
          target.insertAdjacentElement('beforebegin', draggedItemElement);
        } else if (target.offsetLeft > draggedItemElement.offsetLeft) {
          target.insertAdjacentElement('afterend', draggedItemElement);
        }
      } else {
        if (target.offsetTop < draggedItemElement.offsetTop) {
          target.insertAdjacentElement('beforebegin', draggedItemElement);
        } else if (target.offsetTop > draggedItemElement.offsetTop) {
          target.insertAdjacentElement('afterend', draggedItemElement);
        }
      }
    }
    evt.preventDefault();
  });
})();
