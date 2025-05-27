export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

export const likeCard = (likeButton) => {
  if (likeButton.classList.contains('card__like-button_is-active')){
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
}
    
export const removeCard = (element) => {
  element.remove();
};

export const createCard = (dataCard, deleteCard, likeCard, clickImage) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;
  cardTitle.textContent = dataCard.name;

  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCard(likeButton);
  });

  cardImage.addEventListener('click', () => {
    clickImage(cardImage.src, cardTitle.textContent, cardImage.alt);
  });

  return cardElement;
};