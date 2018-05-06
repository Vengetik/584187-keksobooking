'use strict';
(function () {
  var cardTemplate = document.querySelector('template')
      .content.querySelector('article.map__card');

  window.card = {
    create: function (cardOffer) {
      var card = cardTemplate.cloneNode(true);
      var russianType;
      var featuresList = card.querySelector('.popup__features');
      var cardImgBlock = card.querySelector('.popup__photos');
      var cardImg = card.querySelector('.popup__photo');
      cardImgBlock.removeChild(cardImg);
      switch (cardOffer.offer.type) {
        case 'flat':
          russianType = 'Квартира';
          break;
        case 'bungalo':
          russianType = 'Бунгало';
          break;
        case 'house':
          russianType = 'Дом';
          break;
        case 'palace':
          russianType = 'Дворец';
          break;
      }
      card.querySelector('.popup__title').textContent = cardOffer.offer.title;
      card.querySelector('.popup__text--address').textContent = cardOffer.offer.address;
      card.querySelector('.popup__text--price').textContent = cardOffer.offer.price + '₽/ночь';
      card.querySelector('.popup__type').textContent = russianType;
      card.querySelector('.popup__text--capacity').textContent = cardOffer.offer.rooms + 'комнаты для ' + cardOffer.offer.guests + 'гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardOffer.offer.checkin + ', выезд до ' + cardOffer.offer.checkout;
      featuresList.innerHTML = '';
      cardOffer.offer.features.forEach(function (feature) {
        var newElement = document.createElement('li');
        newElement.classList.add('popup__feature', 'popup__feature--' + feature);
        featuresList.appendChild(newElement);
      });
      card.querySelector('.popup__description').textContent = cardOffer.offer.description;
      cardOffer.offer.photos.forEach(function (photo) {
        var hotelImage = document.createElement('img');
        hotelImage.src = photo;
        hotelImage.classList.add('popup__photo');
        hotelImage.width = '45';
        hotelImage.height = '40';
        hotelImage.alt = 'Фотография жилья';
        cardImgBlock.appendChild(hotelImage);
      })
      card.querySelector('.popup__avatar').src = cardOffer.author.avatar;

      return card;
    }
  };
})();
