/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

// Type is either password or data
const profile = 'Profile was updated succesffully';
const password = 'Password was successully changed';
export const updateUserInformation = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword'
        : 'http://127.0.0.1:3000/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data: {
        data
      }
    });
    showAlert('success', `${type === 'password' ? password : profile}`);
  } catch (err) {
    showAlert('error', 'Unable to update profile! Try again later');
  }
};
