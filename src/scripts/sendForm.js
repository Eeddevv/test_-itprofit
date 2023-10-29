import { validateFields } from './validate';
import { errorMessages } from './validate';
import { fetchForm } from './fetchForm';

const messageForm = document.getElementById('message-form');

export const sendForm = async () => {
  const form = document.getElementById('form');
  validateFields(form);
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formSend = true;
    validateFields(form, formSend);
    if (!errorMessages) {
      const username = form.querySelector('[name="username"]');
      const email = form.querySelector('[name="email"]');
      const phone = form.querySelector('[name="phone"]');
      const message = form.querySelector('[name="message"]');

      const fields = [username, email, phone, message];
      const data = {};

      fields.forEach((field) => {
        data[field.name] = field.value;
      });

      const response = await fetchForm(data);
      if (response) {
        messageForm.innerHTML = response;
        messageForm.className = 'success';
        fields.forEach((field) => (field.value = ''));
      } else {
        messageForm.innerHTML = 'Произошла ошибка, повторите попытку';
        messageForm.className = 'error';
      }
    }
  });
};

sendForm();
