'use strict';
var offersMap = document.querySelector('.map');
offersMap.classList.remove('.map--faded');

var avatar = [1, 2, 3, 4, 5, 6, 7, 8];
var renderTitle = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var check = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var renderPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ads = [];

var sortArray = function (someArray) {
  return someArray.sort(function () {
    return Math.random() - 0.5;
  });
};
var getRandomArrayElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};
var getRandomValue = function (max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var createOffers = function (ad) {
  for (var i = 0; i < 8; i++) {
    ad[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + avatar[i] + '.png'
      },
      offer: {
        title: sortArray(renderTitle),
        address: location.x + ', ' + location.y,
        price: getRandomValue(1000000, 1000),
        type: getRandomArrayElement(types),
        rooms: getRandomValue(5, 1),
        guests: ad.rooms + 1,
        checkin: getRandomArrayElement(check),
        checkout: getRandomArrayElement(check),
        features: sortArray(features.slice(0, Math.floor(Math.random() * features.length) + 1)),
        description: '',
        photos: sortArray(renderPhotos)
      },
      location: {
        x: getRandomValue(900, 300),
        y: getRandomValue(500, 150)
      }
    };
  }
};
createOffers(ads);


