import axios from 'axios';
// import Config from 'react-native-config';
const BASE_URL = 'http://localhost:1337';
class AuthRepository {
  DATA_COUNT_PER_FEED = 12;

  checkAuthState(token) {
    if (!token) return null;
    return axios.get(`http://localhost:1337/users/me`, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }

  checkEmailOverlap(email) {
    return axios.get(`${BASE_URL}/api/users/?filters[email][$eq]=${email}`);
  }

  checkPhoneNumberOverlap(phoneNumber) {
    return axios.get(
      `${BASE_URL}/api/authentications/?phone_number=${phoneNumber}`,
    );
  }

  confirmVerifyCode(phoneNumber, code) {
    return axios.get(
      `${BASE_URL}/api/authentications/confirm?phone_number=${phoneNumber}&code=${code}`,
    );
  }

  checkUsernameVacancy(username) {
    return axios.post(`${BASE_URL}/check-username-vacancy`, {
      username: username,
    });
  }

  submitGoogleAccessToken(accessToken, username = '') {
    return axios.get(
      `${BASE_URL}/auth/google/callback?access_token=${accessToken}&username=${username}`,
    );
  }
  submitFacebookAccessToken(accessToken, username = '') {
    return axios.get(
      `${BASE_URL}/auth/facebook/callback?access_token=${accessToken}&username=${username}`,
    );
  }

  getUsers(feedCount, filterString) {
    if (!filterString) {
      return {data: [], status: 200};
    }
    return axios.get(
      `${BASE_URL}/users?${filterString}_start=${
        feedCount * this.DATA_COUNT_PER_FEED
      }&_limit=${this.DATA_COUNT_PER_FEED}`,
    );
  }

  getOneUser(id) {
    return axios.get(`${BASE_URL}/users/${id}`);
  }

  updateAccountInfo(user_id, data, jwt) {
    return axios.post(
      `${BASE_URL_2}/update-account-info/`,
      {id: user_id, data: data},
      {headers: {Authorization: `Bearer ${jwt}`}},
    );
  }

  updateAccountUsername(user_id, username, jwt) {
    return axios.put(
      `${BASE_URL}/users/${user_id}`,
      {username: username},
      {headers: {Authorization: `Bearer ${jwt}`}},
    );
  }

  followUser(data, jwt) {
    return axios.post(`${BASE_URL}/follows/`, data, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
  }

  unfollowUser(id, jwt) {
    return axios.delete(`${BASE_URL}/follows/${id}`, {
      headers: {Authorization: `Bearer ${jwt}`},
    });
  }
}

export default new AuthRepository();
