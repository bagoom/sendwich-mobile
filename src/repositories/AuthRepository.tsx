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

  updateFcmToken(userId: any, OS: any, fcmToken: any) {
    return axios.put(`${BASE_URL}/api/users/${userId}`, {
      os: OS,
      fcm_token: fcmToken,
    });
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
    return axios.get(`${BASE_URL}/api/home-icons?populate=*&sort=order`);
  }

  confirmVerifyCode(phoneNumber: string, code: string) {
    return axios.get(
      `${BASE_URL}/api/authentications/confirm?phone_number=${phoneNumber}&code=${code}`,
    );
  }

  getShopList(start: any, typeText: any, category: any, coords: any) {
    const type =
      typeText === '인기순'
        ? 'popular'
        : typeText === '거리순'
        ? 'distance'
        : typeText === '할인율순'
        ? 'discount'
        : 'popular';
    console.log(`&km=12&lat=${coords.lat}&lng=${coords.lng}`);
    return axios.get(
      `${BASE_URL}/api/stores/distances?_start=${start}&_limit=${
        start + 40
      }&km=12&lat=${coords.lat}&lng=${
        coords.lng
      }&order=${type}&category=${category}`,
    );
  }

  storeFiltering(start: any, coords: any, keyword: string) {
    return axios.get(
      `${BASE_URL}/api/stores/filter?_start=${start}&_limit=${
        start + 40
      }&km=12&lat=${coords.lat}&lng=${coords.lng}&keyword=${keyword}`,
    );
  }

  getPopularKeywordList() {
    return axios.get(`${BASE_URL}/api/keywords/popular`);
  }

  getRecommendKeywordList() {
    return axios.get(`${BASE_URL}/api/recommend-keywords`);
  }

  createKeyword(keyword: string) {
    return axios.post(`${BASE_URL}/api/keywords`, {
      data: {keyword: keyword},
    });
  }

  getCurationStoreList(start: any, coords: any, query: any) {
    return axios.get(
      `${BASE_URL}/api/stores/curation?${query}&_start=${start}&_limit=${
        start + 40
      }&km=12&lat=${coords.lat}&lng=${coords.lng}`,
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
