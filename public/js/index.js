/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';
import { updateUserInformation } from './updateUser';
import { displayMap } from './mapbox';
import { bookTour } from './stripe';

//DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const userForm = document.querySelector('.form-user-data');
const pswForm = document.querySelector('.form-user-settings');
const logoutBtn = document.querySelector('.nav__el--logout');
const bookBtn = document.getElementById('book-tour');

// Values

if (mapBox) {
  const locations = JSON.parse(
    document.getElementById('map').dataset.locations
  );
  displayMap(locations);
}

if (loginForm) {
  console.log('form');
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}

if (logoutBtn) logoutBtn.addEventListener('click', logout);

if (userForm) {
  document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateUserInformation(form, 'updateMe');
    console.log(form);
  });
}

// if (pswForm) {
//   document.querySelector('.form').addEventListener('submit', async e => {
//     e.preventDefault();
//     document.querySelector('.btn--save-password').textContent = 'Updating...';

//     const oldPassword = document.getElementById('password-current').value;
//     const password = document.getElementById('password').value;
//     const passwordCOnf = document.getElementById('password-confirm').value;
//     await updateUserInformation(
//       { oldPassword, password, passwordCOnf },
//       'password'
//     );
//     document.querySelector('.btn--save-password').value = 'Save Password';
//   });
// }

if (bookBtn)
  bookBtn.addEventListener('click', e => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
