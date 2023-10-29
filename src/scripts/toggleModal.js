const modal = document.getElementById('modal');

export const showModal = () => {
  modal.classList.add('modal__active');
  document.documentElement.classList.add('overflow');
};

export const closeModal = () => {
  modal.classList.remove('modal__active');
  document.documentElement.classList.remove('overflow');
};

modal.addEventListener('click', closeModal);
