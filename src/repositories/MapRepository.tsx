import axios from 'axios';
import {BASE_URL, KAKAO_REST} from '@env';
class MapRepository {
  getAddr(coords: string) {
    return axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?${coords}&input_coord=WGS84`,
      {headers: {Authorization: `KakaoAK ${KAKAO_REST}`}},
    );
  }
  searchAddr(keyword: string) {
    return axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${keyword}`,
      {headers: {Authorization: `KakaoAK ${KAKAO_REST}`}},
    );
  }
}

export default new MapRepository();
