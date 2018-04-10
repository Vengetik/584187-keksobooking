'use strict';
// offer variables
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
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var renderPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
// DOM variables
var fragment = document.createDocumentFragment();

//  Removed map faded
var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');

// Pin variables
var PIN_HALF_WIDTH = 32;
var PIN_HEIGHT = 86;
var mapPin = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('template').content.querySelector('button.map__pin');


// optimization func
var shuffleArray = function (someArray) {
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

// offer block
var createOffers = function () {
  var ads = [];
  var shuffledTitile = shuffleArray(renderTitle);
  for (var i = 0; i < 8; i++) {
    ads[i] = {
      author: {
        avatar: 'img/avatars/user' + '0' + avatar[i] + '.png'
      },
      offer: {
        title: shuffledTitile[i],
        address: '',
        price: getRandomValue(1000000, 1000),
        type: getRandomArrayElement(types),
        rooms: getRandomValue(5, 1),
        guests: getRandomValue(15, 1),
        checkin: getRandomArrayElement(check),
        checkout: getRandomArrayElement(check),
        features: shuffleArray(features.slice(0, Math.floor(Math.random() * features.length) + 1)),
        description: '',
        photos: shuffleArray(renderPhotos)
      },
      location: {
        x: getRandomValue(900, 300),
        y: getRandomValue(500, 150)
      }
    };
    ads[i].offer.address = ads[i].location.x.toString() + ', ' + ads[i].location.y.toString();
  }
  return ads;
};

// create pin
var renderPin = function (offers, i) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = offers[i].location.x - PIN_HALF_WIDTH;
  pin.style.top = offers[i].location.y - PIN_HEIGHT;
  pin.querySelector('img').src = offers[i].author.avatar;
  pin.querySelector('img').alt = offers[i].offer.title;
  return pin;
};
// render pin on map

for (var i = 0; i < createOffers.length; i++) {
  fragment.appendChild(renderPin(createOffers, i));
}
mapPin.appendChild(fragment);

