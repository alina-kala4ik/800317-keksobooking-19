'use strict';

(function () {

  var FILE_TYPES = ['jpg', 'jpeg', 'png'];

  var fileChooserPhoto = document.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = document.querySelector('.ad-form__photo');

  var fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview');

  var pullPhoto = function (fileChooser, preview) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var validPhoto = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (validPhoto) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (preview.querySelector('img') === null) {
          preview.style.backgroundImage = 'url("' + reader.result + '")';
        } else {
          var image = preview.querySelector('img');
          image.src = reader.result;
        }
      });
      reader.readAsDataURL(file);
    }
  };

  var fileChooserPhotoHandler = function () {
    pullPhoto(fileChooserPhoto, previewPhoto);
  };

  var fileChooserAvatarHandler = function () {
    pullPhoto(fileChooserAvatar, previewAvatar);
  };

  window.photo = {
    house: fileChooserPhotoHandler,
    avatar: fileChooserAvatarHandler
  };

})();
