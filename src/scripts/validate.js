import IMask from 'imask';

let errorMessages = false;
const messageForm = document.getElementById('message-form');

export const validateFields = (form, formSend) => {
  const fields = form.querySelectorAll('[data-validation-keys]');
  messageForm.innerHTML = '';
  errorMessages = false;

  fields.forEach((input) => {
    const validationKeys = input
      .getAttribute('data-validation-keys')
      .split(', ');

    if (formSend) {
      validationKeys.forEach((key) => {
        validationRules[key](input);
      });
    }

    validationKeys.forEach((key) => {
      input.addEventListener('input', () => {
        messageForm.innerHTML = '';
        validationRules[key](input);
      });
    });
  });

  return errorMessages;
};

export const createErrorField = (input, errorMessage) => {
  const errorField = input.nextElementSibling;

  if (!errorField || errorField.className !== 'error') {
    const errorHTML = `<div class="error">${errorMessage}</div>`;
    input.insertAdjacentHTML('afterend', errorHTML);
  }
  errorMessages = true;
};

export const clearErrorField = (input) => {
  const errorField = input.nextElementSibling;
  if (errorField && errorField.className === 'error') {
    errorField.remove();
  }
  errorMessages = false;
};

const validateByRequired = (input) => {
  if (!input.value) {
    createErrorField(input, 'Поле обязательно к заполнению');
  } else {
    clearErrorField(input);
  }
  return input.value;
};

const validateByEmail = (input) => {
  if (validateByRequired(input)) {
    const emailRegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegExp.test(input.value) && input.value) {
      createErrorField(input, 'Введите корректный email');
    }
  } else {
    clearErrorField(input);
    createErrorField(input, 'Поле обязательно к заполнению');
  }
};

const validateByPhone = (input) => {
  const phoneMask = new IMask(input, {
    mask: '+{375}(00)000-00-00',
  });
  if (validateByRequired(input)) {
    if (phoneMask.masked.isComplete && input.value) {
      clearErrorField(input);
    } else {
      createErrorField(input, 'Введите корректный номер телефона');
    }
  } else {
    clearErrorField(input);
    createErrorField(input, 'Поле обязательно к заполнению');
  }
};

const validationRules = {
  required: validateByRequired,
  email: validateByEmail,
  phone: validateByPhone,
};

export { errorMessages };
