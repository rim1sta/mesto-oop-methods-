
(function () {
/** REVIEW: Можно лучше:
 * 
 * Перменные cardTemplate, popupAdd, popupEdit, newCardForm и popupImg объявлены, но не используется, можно их удалить
 */
const cardTemplate = document.querySelector('#place-template').content.querySelector('.place-card');
const placesList = document.querySelector('.places-list');
const popupOpenButton = document.querySelector('.button');
const popupAdd = document.querySelector('.popup_add');
const popupEdit = document.querySelector('.popup_edit');
const popupCloseAddButton = document.querySelector('.popup__close-add');
const popupCloseImgButton = document.querySelector('.popup__close-img');
const popupCloseEditButton = document.querySelector('.popup__close-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link-url');
const newCardForm = document.querySelector('.popup__form');
const buttonEdit = document.querySelector('.button-edit');
const name = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const authorInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
const formEdit = document.forms.editForm;
const formAdd = document.forms.addForm;
const popupImage = document.querySelector('.popup__image');
const popupImg = document.querySelector('.popup_img');
const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
  wrongPattern: 'Введите данные в верном формате',
}




function createCard(dataForElement) {
  const card = new Card(dataForElement, openImg)
  return card.create();
}


const addPopup = new Popup(document.querySelector('.popup_add'))
const editPopup = new Popup(document.querySelector('.popup_edit'))
const imgPopup = new Popup(document.querySelector('.popup_img'))
const userInfo = new UserInfo(name, job, authorInput, jobInput);
const cardList = new CardList(placesList, initialCards, createCard);
const addFormValidator = new FormValidator(formAdd, errorMessages);
addFormValidator.setEventListeners();
const editFormValidator = new FormValidator(formEdit, errorMessages);
editFormValidator.setEventListeners();



function openImg(url) {
  popupImage.setAttribute('src', url);
  imgPopup.open();
}

cardList.render();
//callback

popupOpenButton.addEventListener('click', () => {
  addFormValidator.setSubmitButtonState(false);
  addPopup.open();
});

buttonEdit.addEventListener('click', () => {
  editPopup.open();
  userInfo.setUserInfo(name.textContent, job.textContent)
});
formEdit.addEventListener('submit', (evt) => {
  evt.preventDefault();
  userInfo.updateUserInfo(authorInput.value, jobInput.value)
  editPopup.close();
})

formAdd.addEventListener('submit', (evt) => {
  evt.preventDefault()
  cardList.addCard(createCard({ name: nameInput.value, link: linkInput.value }))
  formAdd.reset();
  addPopup.close()
})
popupCloseAddButton.addEventListener('click', () => {
  addFormValidator.deleteErrors();
  addFormValidator.setSubmitButtonState(false);
  formAdd.reset();
  addPopup.close();
});
popupCloseEditButton.addEventListener('click', () => {
  editFormValidator.setSubmitButtonState(true);
  editFormValidator.deleteErrors();
  editPopup.close();
});
popupCloseImgButton.addEventListener('click', () => {
  imgPopup.close();
});
})();

/** REVIEW: 
 * 
 * В целом по работе: 
 * 
 * Все критические ошибки были исправлены и также были приняты к сведению комментарии из "можно лучше", отличная работа! 
 * Спасибо за усилия и старания, удачи в следующем спринте и успехов в дальнейшем обучении
 * 
 * Можно лучше: 1) Вынести реализацию открытия попапа с большим изображением из класса Card
 * 2) Перменные cardTemplate, popupAdd, popupEdit, newCardForm и popupImg объявлены, но не используется (script.js)
 * 3) Реализовать закрытие попапа по клику на Escape (keycode = 27)
 */