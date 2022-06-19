import * as React from 'react';
import {
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';

import prepareNavigationService from '../lib/navigation-service';
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

type Route = {
  key: string;
  name: string;
  index: number;
  stack: any[];
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
  profile = [];

  constructor() {
    this.navService = prepareNavigationService(this.navigationRef);
    this.storageService = prepareStorageService();
    makeObservable(this, {
      currentRoute: observable,
      history: observable,
      loggedIn: observable,
      authChecked: observable,
      profile: observable,
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
      const token: KakaoOAuthToken = await login();
    } catch (error) {
      console.log(error);
    } finally {
      this.getProfile();
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
      });
    }
  };

  getProfile = async (): Promise<void> => {
    //@ts-ignore
    const profile: KakaoProfile = await getKakaoProfile();
    runInAction(() => {
      //@ts-ignore
      this.profile = profile;
      if (this.profile) {
        this.loggedIn = true;
        console.log(this.profile.id);
        AsyncStorage.setItem('user_id', this.profile.nickname, () => {});

        AsyncStorage.getItem('user_id', (err, result) => {
          console.log(result); // result에 담김 //불러온거 출력
        });
      }
    });
  };
}

let globalStore: GlobalStore | null = null;

if (globalStore === null) {
  globalStore = new GlobalStore();
}

export default globalStore as GlobalStore;
