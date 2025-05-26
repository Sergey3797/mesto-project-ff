import '../pages/index.css';
import {initialCards, createCard} from '../components/cards.js';

function removeCard(element) {
  element.remove();
};

const placesList = document.querySelector ('.places__list');

initialCards.forEach(function(item){
  const newCardElement = createCard(item, removeCard);
  placesList.append(newCardElement);
});






