import axios from 'axios';
import {BASE_URL} from '@env';

class AuthRepository {
  DATA_COUNT_PER_FEED = 12;

  signUpWithKakao(signUpData: object) {
    return axios.post(`${BASE_URL}/api/users-permissions/register`, signUpData);
  }

  signInWithKakao(accessToken: object) {
    return axios.post(`${BASE_URL}/api/users-permissions/login`, accessToken);
  }

  checkAuthState(token: string) {
    // if (!token) return null;
    return axios.get(`${BASE_URL}/api/users/me`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  checkEmailOverlap(email: string) {
    return axios.get(`${BASE_URL}/api/users/?filters[email][$eq]=${email}`);
  }

  checkPhoneVerifyNumber(phoneNumber: string) {
    return axios.get(
      `${BASE_URL}/api/authentications/?phone_number=${phoneNumber}`,
    );
  }

  getCategories() {
    return axios.get(`${BASE_URL}/api/categories?populate=*`);
  }

  getHomeIcons() {
    return axios.get(`${BASE_URL}/api/home-icons?populate=*`);
  }

  confirmVerifyCode(phoneNumber: string, code: string) {
    return axios.get(
      `${BASE_URL}/api/authentications/confirm?phone_number=${phoneNumber}&code=${code}`,
    );
  }

  // getUsers(feedCount, filterString) {
  //   if (!filterString) {
  //     return {data: [], status: 200};
  //   }
  //   return axios.get(
  //     `${BASE_URL}/users?${filterString}_start=${
  //       feedCount * this.DATA_COUNT_PER_FEED
  //     }&_limit=${this.DATA_COUNT_PER_FEED}`,
  //   );
  // }

  // getOneUser(id) {
  //   return axios.get(`${BASE_URL}/users/${id}`);
  // }

  // updateAccountInfo(user_id, data, jwt) {
  //   return axios.post(
  //     `${BASE_URL_2}/update-account-info/`,
  //     {id: user_id, data: data},
  //     {headers: {Authorization: `Bearer ${jwt}`}},
  //   );
  // }

  // updateAccountUsername(user_id, username, jwt) {
  //   return axios.put(
  //     `${BASE_URL}/users/${user_id}`,
  //     {username: username},
  //     {headers: {Authorization: `Bearer ${jwt}`}},
  //   );
  // }

  // followUser(data, jwt) {
  //   return axios.post(`${BASE_URL}/follows/`, data, {
  //     headers: {Authorization: `Bearer ${jwt}`},
  //   });
  // }

  // unfollowUser(id, jwt) {
  //   return axios.delete(`${BASE_URL}/follows/${id}`, {
  //     headers: {Authorization: `Bearer ${jwt}`},
  //   });
  // }
}

export default new AuthRepository();
