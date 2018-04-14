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
// DOM variables
var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();
var mapBlock = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var mapPins = document.querySelector('.map__pins');
var mainMapPin = document.querySelector('.map__pin--main');
// Pin variables
var PIN_HALF_WIDTH = 32;
var PIN_HEIGHT = 86;
var UNACTIVE_MAIN_PIN_WIDTH = 100;
var UNACTIVE_MAIN_PIN_HEIGHT = 100;
var ACTIVE_MAIN_PIN_WIDTH = 32;
var ACTIVE_MAIN_PIN_HEIGHT = 87;
var pinTemplate = document.querySelector('template')
    .content.querySelector('button.map__pin');

// card variables
var cardTemplate = document.querySelector('template')
    .content.querySelector('article.map__card');

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
var createPin = function (offerPin) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = offerPin.location.x - PIN_HALF_WIDTH + 'px';
  pin.style.top = offerPin.location.y - PIN_HEIGHT + 'px';
  pin.querySelector('img').src = offerPin.author.avatar;
  pin.querySelector('img').alt = offerPin.offer.title;
  return pin;
};
// render pin on map
var offers = createOffers();
var renderPins = function (pinOffers) {
  for (var i = 0; i < pinOffers.length; i++) {
    var pin = createPin(pinOffers[i]);
    fragment.appendChild(pin);
  }
  mapPins.appendChild(fragment);
};

var createCard = function (offerCard) {
  var card = cardTemplate.cloneNode(true);
  var russianType;
  var featuresList = card.querySelector('.popup__features');
  var cardImgBlock = card.querySelector('.popup__photos');
  var cardImg = card.querySelector('.popup__photo');
  cardImgBlock.removeChild(cardImg);
  if (offerCard.offer.type === 'flat') {
    russianType = 'Квартира';
  } else if (offerCard.offer.type === 'bungalo') {
    russianType = 'Бунгало';
  } else if (offerCard.offer.type === 'house') {
    russianType = 'Дом';
  } else if (offerCard.offer.type === 'palace') {
    russianType = 'Дворец';
  }
  card.querySelector('.popup__title').textContent = offerCard.offer.title;
  card.querySelector('.popup__text--address').textContent = offerCard.offer.address;
  card.querySelector('.popup__text--price').textContent = offerCard.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = russianType;
  card.querySelector('.popup__text--capacity').textContent = offerCard.offer.rooms + 'комнаты для ' + offerCard.offer.guests + 'гостей';
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + offerCard.offer.checkin + ', выезд до ' + offerCard.offer.checkout;
  featuresList.innerHTML = '';
  for (var j = 0; j < offerCard.offer.features.length; j++) {
    var newElement = document.createElement('li');
    newElement.classList.add('popup__feature', 'popup__feature--' + offerCard.offer.features[j]);
    featuresList.appendChild(newElement);
  }
  card.querySelector('.popup__description').textContent = offerCard.offer.description;
  for (var i = 0; i < offerCard.offer.photos.length; i++) {
    var hotelImage = document.createElement('img');
    hotelImage.src = offerCard.offer.photos[i];
    hotelImage.classList.add('popup__photo');
    hotelImage.width = '45';
    hotelImage.height = '40';
    hotelImage.alt = 'Фотография жилья';
    cardImgBlock.appendChild(hotelImage);
  }
  card.querySelector('.popup__avatar').src = offerCard.author.avatar;

  return card;
};
var renderCard = function (cardOffer) {
  var card = createCard(cardOffer);
  fragmentCard.appendChild(card);
  mapBlock.insertBefore(fragmentCard, mapBlock.children[3]);
};

// Disable form elements
var toggleForm = function (tagName, hide) {
  var formFields = document.getElementsByTagName(tagName);
  for (var i = 0; i < formFields.length; i++) {
    formFields[i].disabled = hide;
  }
};
toggleForm('fieldset', true);

var callAds = function (selector) {
  var mapPin = document.querySelectorAll(selector);
  for (var i = 0; i < mapPin.length; i++) {
    mapPin[i].addEventListener('click', function () {
      renderCard(offers[1]);
    });
  }
};
console.log(callAds('.map__pin:not(.map__pin--main)'))
var activatePage = function () {
  mapBlock.classList.remove('map--faded'); //  Removed map faded
  adForm.classList.remove('ad-form--disabled'); // Remove blur from form
  toggleForm('fieldset', false); // Activate form
  renderPins(offers);
  callAds('.map__pin:not(.map__pin--main)');
  fillFormValue(ACTIVE_MAIN_PIN_WIDTH, ACTIVE_MAIN_PIN_HEIGHT);
};


var fillFormValue = function (pinWidth, pinHeight) {
  var x = parseInt(mainMapPin.style.left, 10) - pinWidth;
  var y = parseInt(mainMapPin.style.top, 10) - pinHeight;
  var value = x + ', ' + y;
  document.forms[1].address.value = value;
};
fillFormValue(UNACTIVE_MAIN_PIN_WIDTH, UNACTIVE_MAIN_PIN_HEIGHT);

mainMapPin.addEventListener('mouseup', activatePage);
