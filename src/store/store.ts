import * as React from 'react';
import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
import {Alert} from 'react-native';

import prepareNavigationService from '../lib/navigation-service';
import {mobilevalidate} from '../lib/validation-service';
// import prepareNavigationService, {navigate} from '../lib/navigation-service';
import prepareStorageService, {MobileStorage} from '../lib/storage-service';
import {makeObservable, observable, reaction, runInAction} from 'mobx';
import {
  KakaoOAuthToken,
  KakaoProfile,
  getProfile as getKakaoProfile,
  login,
  logout,
  unlink,
} from '@react-native-seoul/kakao-login';
import AsyncStorage from '@react-native-community/async-storage';
import AuthRepository from '../repositories/AuthRepository';
type Route = {
  key: string;
  name: string;
  index: number;
  stack: any[];
};

type Profile = {
  nickname: string;
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

  profile: Profile = {
    nickname: '',
  };

  gender = '';
  phoneNumber = '';
  verifyCode = '';
  showPhoneAuthNumberInput = false;
  activeNextStack = false;

  constructor() {
    this.navService = prepareNavigationService(this.navigationRef);
    this.storageService = prepareStorageService();
    makeObservable(this, {
      currentRoute: observable,
      history: observable,
      loggedIn: observable,
      authChecked: observable,
      profile: observable,
      gender: observable,
      phoneNumber: observable,
      verifyCode: observable,
      showPhoneAuthNumberInput: observable,
      activeNextStack: observable,
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

  signInWithKakao = async (): Promise<void> => {
    try {
      const {accessToken} = await login();
      //@ts-ignore
      const {email}: KakaoProfile = await getKakaoProfile();
      const {data} = await AuthRepository.checkEmailOverlap(email);
      console.log(data.length);

      if (!data.length) {
        runInAction(() => {
          this.loggedIn = true;
          this.authChecked = false;
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      // this.getProfile();
    }
  };

  signOutWithKakao = async (): Promise<void> => {
    let message = '';
    try {
      message = await logout();
    } catch (e) {
      console.log(e);
    } finally {
      runInAction(() => {
        this.loggedIn = false;
        console.log(message);
        AsyncStorage.clear();
        this.profile.nickname = '';
      });
    }
  };

  getProfile = async (token): Promise<void> => {
    //@ts-ignore
    const profile: KakaoProfile = await getKakaoProfile();
    runInAction(() => {
      this.profile = profile;
      if (this.profile) {
        this.loggedIn = true;
        AsyncStorage.setItem('user_id', this.profile.nickname, () => {});
      }
      // if (token) {
      //   await AsyncStorage.setItem(`@${this.rootStore.PROJECT_NAME}_jwt`, jwt);
      // }
    });
  };

  getUserAuth = () => {
    runInAction(() => {
      AsyncStorage.getItem('user_id', (err, result: any) => {
        this.profile.nickname = result;
      });
    });
  };

  setGender = (gender: string) => {
    runInAction(() => {
      this.gender = gender;
    });
  };

  AuthenticatePhoneNumber = async (): Promise<void> => {
    const validate = mobilevalidate(this.phoneNumber);
    if (!validate) {
      return Alert.alert('휴대폰 번호의 형식에 맞게 숫자만 입력해 주세요.');
    }
    const {data} = await AuthRepository.checkPhoneNumberOverlap(
      this.phoneNumber,
    );
    if (data.status == 200) {
      runInAction(() => {
        this.showPhoneAuthNumberInput = true;
      });
    }
    Alert.alert(data.message);
  };

  confirmVerifyCode = async (): Promise<void> => {
    const {data} = await AuthRepository.confirmVerifyCode(
      this.phoneNumber,
      this.verifyCode,
    );
    console.log(data);
    if (data.status == 200) {
      runInAction(() => {
        this.activeNextStack = true;
        this.showPhoneAuthNumberInput = false;
      });
    }
    Alert.alert(data.message);
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
}

let globalStore: GlobalStore | null = null;

if (globalStore === null) {
  globalStore = new GlobalStore();
}

export default globalStore as GlobalStore;
