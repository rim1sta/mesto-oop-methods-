
(function () {

const placesList = document.querySelector('.places-list');
const popupOpenButton = document.querySelector('.button');
const popupCloseAddButton = document.querySelector('.popup__close-add');
const popupCloseImgButton = document.querySelector('.popup__close-img');
const popupCloseEditButton = document.querySelector('.popup__close-edit');
const nameInput = document.querySelector('.popup__input_type_name');
const linkInput = document.querySelector('.popup__input_type_link-url');
const buttonEdit = document.querySelector('.button-edit');
const name = document.querySelector('.user-info__name');
const job = document.querySelector('.user-info__job');
const authorInput = document.querySelector('input[name="forename"]');
const jobInput = document.querySelector('input[name="job"]');
const formEdit = document.forms.editForm;
const formAdd = document.forms.addForm;
const popupImage = document.querySelector('.popup__image');
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
