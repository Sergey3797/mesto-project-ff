import '../pages/index.css';
import {initialCards} from '../components/cards.js';
import {openModal,closeModal} from '../components/modal.js';
import {createCard, removeCard, likeCard} from '../components/card.js';
import {enableValidation, clearValidation} from './validation.js';
import {
  getUser,
  getInitialCards,
  updateUser,
  addNewCard,
  deleteCard,
  addLikeToCard,
  removeLikeFromCard,
  updateAvatar
} from './api.js';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const placesList = document.querySelector ('.places__list');
const profilePopup = document.querySelector('#profile-popup');
const newCardPopup = document.querySelector('#new-card-popup');
const imagePopup = document.querySelector('#image-popup');
const confirmDeletionPopup = document.querySelector('#confirm-deletion-popup');
const updateAvatarPopup = document.querySelector('#update-avatar-popup');
const profilePopupSubmitButton = profilePopup.querySelector('.popup__button');
const newCardPopupSubmitButton = newCardPopup.querySelector('.popup__button');
const updateAvatarPopupSubmitButton = updateAvatarPopup.querySelector('.popup__button');
const confirmDeletionSubmitButton = confirmDeletionPopup.querySelector('.popup__button');
const editButton = document.querySelector('#edit-button');
const addButton = document.querySelector('#add-button');
const updateAvatarButton = document.querySelector('#image-edit-button');
const profilePopupCloseButton = document.querySelector('#profile-popup-close-button');
const newCardPopupCloseButton = document.querySelector('#new-card-popup-close-button');
const imagePopupCloseButton = document.querySelector('#image-popup-close-button');
const confirmDeletionPopupCloseButton = document.querySelector('#confirm-deletion-popup-close-button');
const updateAvatarPopupCloseButton = document.querySelector('#update-avatar-popup-close-button');
const profileTitle = document.querySelector('#profile-title');
const profileAvatar = document.querySelector('#profile-avatar');
const profileDescription = document.querySelector('#profile-description');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const jobInput = profilePopup.querySelector('.popup__input_type_description');
const newCardFormElement = newCardPopup.querySelector('.popup__form');
const cardNameInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const confirmDeletionFormElement = confirmDeletionPopup.querySelector('.popup__form');
const updateAvatarFormElement = updateAvatarPopup.querySelector('.popup__form');
const avatarLinkInput = updateAvatarPopup.querySelector('.popup__input_type_url');

let userId = null;
let cardToDelete = null;

const handleDeleteButtonClick = (element) => {
  cardToDelete = element;
  openModal(confirmDeletionPopup);
}

const handleLikeButtonClick = (buttonElement,likesAmountElement, cardData) => {
  if (cardData.isLiked) {
    removeLikeFromCard(cardData.id).then((res) => {
      likesAmountElement.textContent = res.likes.length;
      likeCard(buttonElement);
      cardData.isLiked = !cardData.isLiked;
    }).catch((err) => {
      console.log(err);
    }); 
  } else {
    addLikeToCard(cardData.id).then((res) => {
      likesAmountElement.textContent = res.likes.length;
      likeCard(buttonElement);
      cardData.isLiked = !cardData.isLiked;
    }).catch((err) => {
      console.log(err);
    }); 
  }
}

Promise.all([getUser(), getInitialCards()]).then((res) => {
  const userData = res[0];
  const initialCardsData = res[1];
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileAvatar.style.background = `url('${userData.avatar}')`;
  userId = userData._id;

  initialCardsData.forEach((item) => {
      const dataCard = {
        link: item.link,
        name: item.name,
        id: item._id,
        allowDelete: item.owner._id === userId,
        likesAmount: item.likes.length,
        isLiked: item.likes.some((like) => {
          return like._id === userId;
        })
      }
      const newCardElement = createCard(dataCard, handleDeleteButtonClick, handleLikeButtonClick, handleCardImageClick);
      placesList.append(newCardElement);
    })
}) .catch((err) => {
    console.log(err);
  }); 

const handleCardImageClick = (link, caption, alt) => {
  imagePopupImg.src = link;
  imagePopupImg.alt = alt;
  imagePopupCaption.textContent = caption;
  openModal(imagePopup);
}

profilePopup.classList.add('popup_is-animated');
newCardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
confirmDeletionPopup.classList.add('popup_is-animated');
updateAvatarPopup.classList.add('popup_is-animated');

editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(profileFormElement, validationConfig);
  openModal(profilePopup);
});

addButton.addEventListener('click', () => {
  cardNameInput.value = '';
  cardLinkInput.value = '';
  clearValidation(newCardFormElement, validationConfig);
  openModal(newCardPopup);
});

updateAvatarButton.addEventListener('click', () => {
  avatarLinkInput.value = '';
  clearValidation(updateAvatarFormElement, validationConfig);
  openModal(updateAvatarPopup);
})

profilePopupCloseButton.addEventListener('click', () => {
  closeModal(profilePopup);
});

newCardPopupCloseButton.addEventListener('click', () => {
  closeModal(newCardPopup);
});

imagePopupCloseButton.addEventListener('click', () => {
  closeModal(imagePopup);
});

confirmDeletionPopupCloseButton.addEventListener('click',() => {
  closeModal(confirmDeletionPopup);
});

updateAvatarPopupCloseButton.addEventListener('click', () => {
  closeModal(updateAvatarPopup);
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

confirmDeletionPopup.addEventListener('click', (event) => {
  if (event.target === confirmDeletionPopup) {
    closeModal(confirmDeletionPopup);
  }
});

updateAvatarPopup.addEventListener('click', (event) => {
  if (event.target === updateAvatarPopup) {
    closeModal(updateAvatarPopup);
  }
});

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault(); 
  const submitButtonText = profilePopupSubmitButton.textContent;
  profilePopupSubmitButton.textContent = 'Сохранение...';
  updateUser(nameInput.value, jobInput.value).then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    closeModal(profilePopup);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    profilePopupSubmitButton.textContent = submitButtonText;
  }); 
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

const handleNewCardFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButtonText = newCardPopupSubmitButton.textContent;
  newCardPopupSubmitButton.textContent = 'Сохранение...';
  addNewCard(cardNameInput.value, cardLinkInput.value).then((res) => {
    const dataCard = {
      link: res.link,
      name: res.name,
      id: res._id,
      allowDelete: res.owner._id === userId,
      likesAmount: res.likes.length,
      isLiked: res.likes.some((like) => {
        return like._id === userId;
      }) 
    }
    const newCard = createCard(dataCard, handleDeleteButtonClick, handleLikeButtonClick, handleCardImageClick);
    placesList.prepend(newCard);
    closeModal(newCardPopup);
    cardNameInput.value = '';
    cardLinkInput.value = '';
    clearValidation(newCardFormElement, validationConfig);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    newCardPopupSubmitButton.textContent = submitButtonText;
  }); 
}

newCardFormElement.addEventListener('submit', handleNewCardFormSubmit);

const handleConfirmDeletionFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButtonText = confirmDeletionSubmitButton.textContent;
  confirmDeletionSubmitButton.textContent = 'Удаление...';
  if (cardToDelete) {
    deleteCard(cardToDelete.id).then(() => {
      removeCard(cardToDelete);
      cardToDelete = null;
      closeModal(confirmDeletionPopup);
    }).catch((err) => {
    console.log(err);
  }).finally(() => {
    confirmDeletionSubmitButton.textContent = submitButtonText;
  }); ;
  }
}

confirmDeletionFormElement.addEventListener('submit', handleConfirmDeletionFormSubmit);

const handleUpdateAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const submitButtonText = updateAvatarPopupSubmitButton.textContent;
  updateAvatarPopupSubmitButton.textContent = 'Сохранение...';
  updateAvatar(avatarLinkInput.value).then((res) => {
    profileAvatar.style.background = `url('${res.avatar}')`;
    closeModal(updateAvatarPopup);
    avatarLinkInput.value = '';
    clearValidation(updateAvatarFormElement, validationConfig);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    updateAvatarPopupSubmitButton.textContent = submitButtonText;
  }); ; 
}

updateAvatarFormElement.addEventListener('submit', handleUpdateAvatarFormSubmit);

enableValidation(validationConfig); 

