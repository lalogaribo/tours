/* eslint-disable */
export const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
};

export const showAlert = (type, message) => {
  hideAlert();
  const markUp = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markUp);
  window.setTimeout(hideAlert, 3000);
};
