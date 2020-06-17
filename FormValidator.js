class FormValidator {
  constructor(form, errorMessages)  {
    this.errorMessages = errorMessages;
    this.form = form;
    this.button = this.form.querySelector('.button');
    this.isFieldValid = this.isFieldValid.bind(this);
    this.handlerInputForm = this.handlerInputForm.bind(this);
    this.deleteErrors = this.deleteErrors.bind(this);
    this.setSubmitButtonState = this.setSubmitButtonState.bind(this);
  }

  checkInputValidity(input){
    this.errorElem = input.nextElementSibling;
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this.errorMessages.empty);
      return false
    }
    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity(this.errorMessages.wrongLength);
      return false
    }
    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity(this.errorMessages.wrongUrl);
      return false
    }
    return input.checkValidity();
  }

  isFieldValid(input){
    const errorForm = this.form;
    const errorElem = errorForm.querySelector(`#${input.id}-error`);
    const valid = this.checkInputValidity(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

  setSubmitButtonState(state){
    if (state) {
        this.button.removeAttribute('disabled');
        this.button.classList.add('popup__button_valid');
        this.button.classList.remove('popup__button_invalid');
      } else {
        this.button.setAttribute('disabled', true);
        this.button.classList.add('popup__button_invalid');
        this.button.classList.remove('popup__button_valid');
      }
  }

  deleteErrors(){
    const errorElements = this.form.querySelectorAll('.error');
    errorElements.forEach((span) => { span.textContent = '' });
  }

  setEventListeners(){
    this.form.addEventListener('input', this.handlerInputForm);
  }
  
  handlerInputForm(evt){
    const currentForm = evt.currentTarget;
    
    this.isFieldValid(evt.target);
    if (currentForm.checkValidity()) {
      this.setSubmitButtonState(true)
    } else {
      this.setSubmitButtonState(false)
    }
  }
}