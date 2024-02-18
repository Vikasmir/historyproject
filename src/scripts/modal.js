function handleShowPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', keyHandler);
}

function handleClosePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');
    handleClosePopup(popup);
  }
}

function mouseHandler(evt) {
  if (evt.target.classList.contains('popup_is-opened')) {
    handleClosePopup(evt.target);
  }
}

export { handleShowPopup, handleClosePopup, mouseHandler };
