// import './fonts/fonts.css';
import './styles/index.css';

import { monuments } from './scripts/monuments.js';
import { list } from './scripts/menu-list.js';
import {
  handleShowPopup,
  handleClosePopup,
  mouseHandler,
} from './scripts/modal.js';

const toUpButton = document.querySelector('.link-to_up');
const monumentTemplate = document.querySelector('#monument-template').content;
const monumentContainer = document.querySelector('.monuments__list');

const listTemplate = document.querySelector('#list-template').content;
const listContainer = document.querySelector('.list');

const popupImage = document.querySelector('.popup_type_image');
const image = popupImage.querySelector('.popup__image');
const imageСaption = popupImage.querySelector('.popup__caption');
const closePopupButton = popupImage.querySelector('.popup__close');

const menuButton = document.querySelector('.menu__button');
const popupWrapper = document.querySelector('.popup-wrapper');

function handleClickImage(evt) {
  image.src = evt.target.src;
  image.alt = evt.target.alt;
  imageСaption.textContent = evt.target.alt;
  handleShowPopup(popupImage);
}

closePopupButton.addEventListener('click', (evt) => {
  const popup = evt.target.closest('.popup');
  handleClosePopup(popup);
});

function getMonumentTemplate() {
  const cloneTemplateMonument = monumentTemplate
    .querySelector('.monument-item')
    .cloneNode(true);
  return cloneTemplateMonument;
}

function createMonument(monument) {
  const monumentItem = getMonumentTemplate();
  const monumentImage = monumentItem.querySelector('.monument-item__image');
  const monumentTitle = monumentItem.querySelector('.monument-item__title');
  const monumentText = monumentItem.querySelector('.monument-item__text');
  const textContainer = monumentItem.querySelector('.text_container');

  monumentItem.id = monument.url;
  monumentImage.src = monument.src;
  monumentImage.alt = monument.name;
  monumentTitle.textContent = monument.name;

  monument.description.split('/').forEach((item) => {
    const paragraph = monumentText.cloneNode();
    paragraph.textContent = item;
    return textContainer.append(paragraph);
  });

  monumentImage.addEventListener('click', handleClickImage);

  return monumentItem;
}

function getListTemplate() {
  const cloneTemplateList = listTemplate
    .querySelector('.list-item')
    .cloneNode(true);
  return cloneTemplateList;
}

function createListItem(list) {
  const listItem = getListTemplate();
  const listLink = listItem.querySelector('.list-item__link');
  const listText = listItem.querySelector('.list-text');

  listLink.href = list.url;
  listText.textContent = list.name;

  return listItem;
}

function renderMonument(monument) {
  const newMonument = createMonument(monument);
  monumentContainer.append(newMonument);
}

function renderList(listItem) {
  const newListItem = createListItem(listItem);
  listContainer.append(newListItem);
}

const Initial = (monuments, list) => {
  monuments.forEach((monument) => {
    renderMonument(monument);
  });
  list.forEach((listItem) => {
    renderList(listItem);
  });
};

Initial(monuments, list);

function showButton() {
  window.scrollY > 300
    ? toUpButton.classList.add('visible')
    : toUpButton.classList.remove('visible');
}

document.addEventListener('scroll', showButton);
document.addEventListener('mousedown', mouseHandler);
menuButton.addEventListener('click', () => {
  handleShowPopup(popupWrapper);
});
listContainer.addEventListener('click', (evt) => {
  if (
    evt.target.classList.contains('list-item__link') ||
    evt.target.classList.contains('list-text')
  )
    handleClosePopup(popupWrapper);
});
