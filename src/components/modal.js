export const openModal = (popupElement) => {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const closeModal = (popupElement) => {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

const handleEscClose = (event) => {
  if (event.key === 'Escape') {
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal);
  }
}


