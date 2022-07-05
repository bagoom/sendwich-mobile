import * as React from 'react';
import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {Alert} from 'react-native';

import prepareNavigationService from '../lib/navigation-service';
import {mobilevalidate} from '../lib/validation-service';
import prepareStorageService, {MobileStorage} from '../lib/storage-service';
import {
  makeObservable,
  observable,
  reaction,
  runInAction,
  computed,
  toJS,
} from 'mobx';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthRepository from '../repositories/AuthRepository';
import MapRepository from '../repositories/MapRepository';
type Route = {
  key: string;
  name: string;
  index: number;
  stack: any[];
};

type Profile = {
  id: number;
  nickname: string;
  email: string;
  thumbnailImageUrl: string;
};

type SendwichProfile = {
  id: number;
  username: string;
  email: string;
  profileUrl: string;
};

export class GlobalStore {
  /** Navigation related */
  currentRoute: Route = {
    key: '',
    name: '추천',
    index: -1,
    stack: [],
  };
  history: Route[] = [];

  navigationRef =
    React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>();
  navService: any;
  storageService: MobileStorage;

  /** Auth status */
  loggedIn = false;
  authChecked = false;
  nonMember = false;

  _kakaoData: Profile = {
    id: 0,
    nickname: '',
    email: '',
    thumbnailImageUrl: '',
  };

  _sendwichProfile: SendwichProfile = {
    id: 0,
    username: '',
    email: '',
    profileUrl: '',
  };

  jwt = '';
  username = '';
  gender = '';
  phoneNumber = '';
  verifyCode = '';
  showPhoneAuthNumberInput = false;
  activeNextStack = false;
  _categories = [];
  _dynamic_categories = [];
  _selectedCategories: any = [];
  _homeIcons = [];

  kakaoToken = '';
  authenticationed = false;

  CCFilterIndex = 0;
  couponModalVisible = false;
  alertStatus = false;

  headerAddr = '';

  _coordsToAddr: any = {};
  _searchAddrArr: any = [];

  constructor() {
    this.navService = prepareNavigationService(this.navigationRef);
    this.storageService = prepareStorageService();
    makeObservable(this, {
      currentRoute: observable,
      history: observable,
      loggedIn: observable,
      authChecked: observable,
      jwt: observable,
      username: observable,
      gender: observable,
      phoneNumber: observable,
      verifyCode: observable,
      showPhoneAuthNumberInput: observable,
      activeNextStack: observable,
      kakaoToken: observable,
      alertStatus: observable,
      CCFilterIndex: observable,
      couponModalVisible: observable,
      nonMember: observable,
      headerAddr: observable,
      _coordsToAddr: observable,
      _searchAddrArr: observable,

      authenticationed: observable,
      _categories: observable,
      _selectedCategories: observable,
      _kakaoData: observable,
      _homeIcons: observable,
      _dynamic_categories: observable,

      sendwichProfile: computed,
      categories: computed,
      dynamic_categories: computed,
      kakaoData: computed,
      homeIcons: computed,
      coordsToAddr: computed,
      searchAddrArr: computed,
    });

    reaction(
      () => this.loggedIn,
      value => {
        console.log('this.loggedIn: ', value);
      },
    );
  }

  setCurrentRoute = (state: NavigationState) => {
    runInAction(() => {
      const route = this.navService.getCurrentRoute(state);
      const routeChanged = route.key !== this.currentRoute.key;
      if (routeChanged) {
        console.log('routeName: ', route.name);
        this.currentRoute = route;
        this.history.unshift(route);
        if (this.history.length > 10) {
          this.history.pop();
        }
      }
    });
  };

  setupAuth = async () => {
    await this.getJtw();

    if (this.jwt) {
      try {
        const {data} = await AuthRepository.checkAuthState(this.jwt);
        this._sendwichProfile = data;
        runInAction(() => {
          this.loggedIn = true;
          this.authChecked = true;
        });
        await AsyncStorage.getItem('@sendwich_addr', (err, result: any) => {
          runInAction(() => {
            this.headerAddr = result;
          });
        });
        console.log(this.headerAddr);
        // console.log(this.sendwichProfile);
      } catch (e) {
        console.log(e);
      }
    }
  };

  getJtw = async () => {
    await AsyncStorage.getItem('@sendwich_jwt', (err, result: any) => {
      try {
        if (result) {
          runInAction(() => {
            this.jwt = result;
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  };

  signUpWithKakao = async () => {
    try {
      const signUpData = {
        idToken: this.kakaoToken,
        username: this.username,
        email: this.kakaoData.email,
        gender: this.gender,
        phoneNumber: this.phoneNumber,
        avatar: this.kakaoData.thumbnailImageUrl,
        categories: this.selectedCategories,
      };
      const {data} = await AuthRepository.signUpWithKakao(signUpData);
      this.hydrateAuthState(data.user, data.jwt);
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  hydrateAuthState = async (userinfo: any, jwt = null) => {
    try {
      if (jwt) {
        await AsyncStorage.setItem(`@sendwich_jwt`, jwt);
        runInAction(() => {
          this.loggedIn = true;
          this.authChecked = true;
          this.nonMember = false;
        });
        await AsyncStorage.getItem('@sendwich_jwt', (err, result: any) => {
          runInAction(() => {
            this.jwt = result;
          });
        });
      }
    } catch (e) {
      console.log(e);
    }
    runInAction(() => {
      this._sendwichProfile = userinfo;
    });
  };

  signInWithKakao = async (): Promise<void> => {
    try {
      const {accessToken} = await login();
      //@ts-ignore
      const profile: Profile = await getKakaoProfile();
      console.log(accessToken);
      runInAction(() => {
        this.username = profile.nickname;
      });
      const signInData = {
        idToken: accessToken,
        kakao_uid: profile.id,
      };
      const {data} = await AuthRepository.signInWithKakao(signInData);
      this.hydrateAuthState(data.user, data.jwt);
      if (data.errors?.msg === '일치하는 유저정보가 없습니다.') {
        runInAction(() => {
          this.authChecked = true;
          this.loggedIn = true;
          this.nonMember = true;
          this._kakaoData = profile;
          this.kakaoToken = accessToken;
        });
      }
    } catch (error: any) {
      console.log(error);
    } finally {
      // this.getProfile();
    }
  };

  signOutWithKakao = async (): Promise<void> => {
    let message = '';
    try {
      message = await logout();
      runInAction(() => {
        this.loggedIn = false;
        this.jwt = '';
      });
      AsyncStorage.clear();
      this.clearStore();
      this.authChecked = true;
    } catch (e) {
      console.log(e);
    } finally {
    }
  };

  AuthenticatePhoneNumber = async (): Promise<void> => {
    const validate = mobilevalidate(this.phoneNumber);
    if (!validate) {
      return Alert.alert('휴대폰 번호의 형식에 맞게 숫자만 입력해 주세요.');
    }
    try {
      const {data} = await AuthRepository.checkPhoneVerifyNumber(
        this.phoneNumber,
      );
      console.log(data);
      if (data.status == 200) {
        runInAction(() => {
          this.showPhoneAuthNumberInput = true;
        });
      }
      Alert.alert(data.message);
    } catch (e: any) {
      if (e.request.status == 400) {
        Alert.alert('이미 사용 중인 휴대폰 번호입니다.');
      }
      if (e.request.status == 500) {
        Alert.alert('일시적인 오류가 발생하였습니다. 관리자에게 문의해주세요.');
      }
    }
  };

  confirmVerifyCode = async (): Promise<void> => {
    const {data} = await AuthRepository.confirmVerifyCode(
      this.phoneNumber,
      this.verifyCode,
    );
    if (data.status == 200) {
      runInAction(() => {
        if (this.gender) {
          this.activeNextStack = true;
        }
        this.authenticationed = true;
        this.showPhoneAuthNumberInput = false;
      });
    }
    Alert.alert(data.message);
  };

  setGender = (gender: string) => {
    runInAction(() => {
      this.gender = gender;
      if (this.authenticationed) {
        this.activeNextStack = true;
      }
    });
  };

  onChangePhoneNumberInput = (number: string) => {
    runInAction(() => {
      this.phoneNumber = number;
    });
  };

  onChangeVerifyCodeInput = (number: string) => {
    runInAction(() => {
      this.verifyCode = number;
    });
  };
  onChangeNameInput = (name: string) => {
    runInAction(() => {
      this.username = name;
    });
  };

  onChangeCCFilter = (index: number) => {
    runInAction(() => {
      this.CCFilterIndex = index;
    });
  };

  toggleCouponModal = (status: boolean) => {
    runInAction(() => {
      this.couponModalVisible = status;
    });
  };

  toggleAlertStatus = (status: boolean) => {
    runInAction(() => {
      this.alertStatus = status;
    });
  };

  getHomeIcons = async () => {
    const {data} = await AuthRepository.getHomeIcons();
    runInAction(() => {
      this._homeIcons = data.data;
      this.authChecked = true;
    });
    // console.log(data);
  };

  getCategories = async (): Promise<void> => {
    const {data} = await AuthRepository.getCategories();
    runInAction(() => {
      this._categories = data.data;
    });
  };

  selectCategory = (item: any) => {
    const match = this.selectedCategories.find((e: any) => e.id === item.id);
    runInAction(() => {
      if (match) {
        this._selectedCategories = this.selectedCategories.filter(
          (s: any) => s.id !== item.id,
        );
      } else {
        this._selectedCategories = this.selectedCategories.concat(item);
      }
    });
  };

  setMyLocation = async (coords: string) => {
    try {
      const {data} = await MapRepository.getAddr(coords);
      // console.log(data);
      runInAction(() => {
        this._coordsToAddr = data?.documents[0];
      });
    } catch (e) {
      console.log(e);
    }
    return;
  };

  searchAddr = async (keyword: string) => {
    try {
      const {data} = await MapRepository.searchAddr(keyword);
      runInAction(() => {
        this._searchAddrArr = data?.documents;
      });
    } catch (e) {
      console.log(e);
    }
    return;
  };

  selectHeaderAddr = (addr: string) => {
    console.log(addr);
    runInAction(() => {
      this.headerAddr = addr;
    });
    AsyncStorage.setItem(`@sendwich_addr`, this.headerAddr);
  };

  clearStore = () => {
    runInAction(() => {
      this.loggedIn = false;
      this.authChecked = false;
      this._kakaoData = {
        id: 0,
        nickname: '',
        email: '',
        thumbnailImageUrl: '',
      };
      this._sendwichProfile = {
        id: 0,
        username: '',
        email: '',
        profileUrl: '',
      };
      this.gender = '';
      this.phoneNumber = '';
      this.verifyCode = '';
      this.showPhoneAuthNumberInput = false;
      this.activeNextStack = false;
      this._categories = [];
      this._selectedCategories = [];
      this.kakaoToken = '';
      this.authenticationed = false;
    });
  };

  get sendwichProfile() {
    return toJS(this._sendwichProfile);
  }
  get categories() {
    return toJS(this._categories);
  }
  get dynamic_categories() {
    const arr = toJS(this._homeIcons);
    let newArr = arr.map((item: any) => {
      return {key: item.title, title: item.title};
    });
    return newArr;
  }
  get selectedCategories() {
    const arr = toJS(this._selectedCategories);
    let newArr = arr.map((item: any) => {
      return {id: item.id};
    });
    return newArr;
  }
  get kakaoData() {
    return toJS(this._kakaoData);
  }
  get homeIcons() {
    return toJS(this._homeIcons);
  }
  get searchAddrArr() {
    return toJS(this._searchAddrArr);
  }
  get coordsToAddr() {
    const arr = toJS(this._coordsToAddr);

    const addr = arr?.address?.address_name;
    const roadArr = arr?.road_address
      ? arr?.road_address?.address_name + ' ' + arr?.road_address?.building_name
      : arr?.address?.address_name;

    return {addr: addr, roadArr: roadArr};
  }
}

let globalStore: GlobalStore | null = null;

if (globalStore === null) {
  globalStore = new GlobalStore();
}

export default globalStore as GlobalStore;
