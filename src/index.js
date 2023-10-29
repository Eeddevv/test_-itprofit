import './assets/styles/style.sass';
import { showModal, closeModal } from './scripts/toggleModal';
import './scripts/sendForm';

document.addEventListener('DOMContentLoaded', function () {
  window.addEventListener('load', function () {
    document.querySelector('.loading-screen').style.display = 'none';
  });
});

const modalContent = document.getElementById('modal-content');
document.getElementById('show-modal').addEventListener('click', showModal);
document.getElementById('close-modal').addEventListener('click', closeModal);
modalContent.addEventListener('click', (event) => {
  event.stopPropagation();
});
