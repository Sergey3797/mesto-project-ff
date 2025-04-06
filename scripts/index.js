function addCard(dataCard, deleteCard){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const placesList = document.querySelector ('.places__list');

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  deleteButton.addEventListener('click', function(){
    deleteCard(cardElement);
  });

  placesList.append(cardElement);
  
  return cardElement;
};

function removeCard(element) {
  element.remove();
};

initialCards.forEach(function(item){
  addCard(item, removeCard);
});






