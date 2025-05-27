import '../pages/index.css';
import {initialCards, createCard, removeCard, likeCard} from '../components/cards.js';
import {openModal,closeModal } from '../components/modal.js';

const placesList = document.querySelector ('.places__list');
const profilePopup = document.querySelector('#profile-popup');
const newCardPopup = document.querySelector('#new-card-popup');
const imagePopup = document.querySelector('#image-popup');
const editButton = document.querySelector('#edit-button');
const addButton = document.querySelector('#add-button');
const profilePopupCloseButton = document.querySelector('#profile-popup-close-button');
const newCardPopupCloseButton = document.querySelector('#new-card-popup-close-button');
const imagePopupCloseButton = document.querySelector('#image-popup-close-button');
const profileTitle = document.querySelector('#profile-title');
const profileDescription = document.querySelector('#profile-description');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const newCardFormElement = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const handleCardImageClick = (link, caption, alt) => {
  imagePopupImg.src = link;
  imagePopupImg.alt = alt;
  imagePopupCaption.textContent = caption;
  openModal(imagePopup);
}



initialCards.forEach(function(item){
  const newCardElement = createCard(item, removeCard, likeCard, handleCardImageClick);
  placesList.append(newCardElement);
});

profilePopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

addButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

profilePopupCloseButton.addEventListener('click', () => {
  closeModal(profilePopup);
});

newCardPopupCloseButton.addEventListener('click', () => {
  closeModal(newCardPopup);
});

imagePopupCloseButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

profilePopup.addEventListener('click', (event) => {
  if (event.target === profilePopup) {
    closeModal(profilePopup);
  }
});

newCardPopup.addEventListener('click' ,(event) => {
  if (event.target === newCardPopup) {
    closeModal(newCardPopup);
  }
});

imagePopup.addEventListener('click', (event) => {
  if (event.target === imagePopup) {
    closeModal(imagePopup);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal(profilePopup);
    closeModal(newCardPopup);
    closeModal(imagePopup);
  }
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const item = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };
  const newCard = createCard(item, removeCard, likeCard, handleCardImageClick);
  placesList.prepend(newCard);
  closeModal(newCardPopup);
}

newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

