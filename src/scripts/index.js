import '../pages/index.css';
import {initialCards, createCard} from '../components/cards.js';
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

function removeCard(element) {
  element.remove();
};

initialCards.forEach(function(item){
  const newCardElement = createCard(item, removeCard);
  placesList.append(newCardElement);
});

editButton.addEventListener('click', function() {
  openModal(profilePopup);
});

addButton.addEventListener('click', function() {
  openModal(newCardPopup);
});

profilePopupCloseButton.addEventListener('click', function() {
  closeModal(profilePopup);
});

newCardPopupCloseButton.addEventListener('click', function() {
  closeModal(newCardPopup);
});

imagePopupCloseButton.addEventListener('click', function() {
  closeModal(imagePopup);
});




