'use strict';
(function () {
  var cardTemplate = document.querySelector('template')
      .content.querySelector('article.map__card');

  window.card = {
    createCard: function (cardOffer) {
      var card = cardTemplate.cloneNode(true);
      var russianType;
      var featuresList = card.querySelector('.popup__features');
      var cardImgBlock = card.querySelector('.popup__photos');
      var cardImg = card.querySelector('.popup__photo');
      cardImgBlock.removeChild(cardImg);
      if (cardOffer.offer.type === 'flat') {
        russianType = 'Квартира';
      } else if (cardOffer.offer.type === 'bungalo') {
        russianType = 'Бунгало';
      } else if (cardOffer.offer.type === 'house') {
        russianType = 'Дом';
      } else if (cardOffer.offer.type === 'palace') {
        russianType = 'Дворец';
      }
      card.querySelector('.popup__title').textContent = cardOffer.offer.title;
      card.querySelector('.popup__text--address').textContent = cardOffer.offer.address;
      card.querySelector('.popup__text--price').textContent = cardOffer.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = russianType;
      card.querySelector('.popup__text--capacity').textContent = cardOffer.offer.rooms + 'комнаты для ' + cardOffer.offer.guests + 'гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardOffer.offer.checkin + ', выезд до ' + cardOffer.offer.checkout;
      featuresList.innerHTML = '';
      for (var j = 0; j < cardOffer.offer.features.length; j++) {
        var newElement = document.createElement('li');
        newElement.classList.add('popup__feature', 'popup__feature--' + cardOffer.offer.features[j]);
        featuresList.appendChild(newElement);
      }
      card.querySelector('.popup__description').textContent = cardOffer.offer.description;
      for (var i = 0; i < cardOffer.offer.photos.length; i++) {
        var hotelImage = document.createElement('img');
        hotelImage.src = cardOffer.offer.photos[i];
        hotelImage.classList.add('popup__photo');
        hotelImage.width = '45';
        hotelImage.height = '40';
        hotelImage.alt = 'Фотография жилья';
        cardImgBlock.appendChild(hotelImage);
      }
      card.querySelector('.popup__avatar').src = cardOffer.author.avatar;

      return card;
    }
  };
})();
