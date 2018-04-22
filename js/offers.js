'use strict';
(function () {
  var avatar = [1, 2, 3, 4, 5, 6, 7, 8];
  var renderTitle = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var check = ['12:00', '13:00', '14:00'];
  var features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];
  var renderPhotos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];
  window.offers = {
    createOffers: function () {
      var ads = [];
      var shuffledTitile = window.util.shuffleArray(renderTitle);
      for (var i = 0; i < 8; i++) {
        ads[i] = {
          author: {
            avatar: 'img/avatars/user' + '0' + avatar[i] + '.png'
          },
          offer: {
            title: shuffledTitile[i],
            address: '',
            price: window.util.getRandomValue(1000000, 1000),
            type: window.util.getRandomArrayElement(types),
            rooms: window.util.getRandomValue(5, 1),
            guests: window.util.getRandomValue(15, 1),
            checkin: window.util.getRandomArrayElement(check),
            checkout: window.util.getRandomArrayElement(check),
            features: window.util.shuffleArray(features.slice(0, Math.floor(Math.random() * features.length) + 1)),
            description: '',
            photos: window.util.shuffleArray(renderPhotos)
          },
          location: {
            x: window.util.getRandomValue(900, 300),
            y: window.util.getRandomValue(500, 150)
          }
        };
        ads[i].offer.address = ads[i].location.x.toString() + ', ' + ads[i].location.y.toString();
      }
      return ads;
    }
  };
})();
