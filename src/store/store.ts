import * as React from 'react';
import {NavigationContainerRef, NavigationState} from '@react-navigation/native';

import prepareNavigationService from '../lib/navigation-service';
import prepareStorageService, {MobileStorage} from '../lib/storage-service';

import {makeObservable, observable, reaction, runInAction} from 'mobx';


type Route = {
    key: string;
    name: string;
    index: number;
    stack: any[];
}
export class GlobalStore {
  /** Navigation related */
  currentRoute: Route = {
    key: '',
    name: 'MainTabHome',
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


  constructor() {
    this.navService = prepareNavigationService(this.navigationRef);
    this.storageService = prepareStorageService();
    makeObservable(this, {
        currentRoute: observable,
        history: observable,
      loggedIn: observable,
      authChecked: observable,
    });

    reaction(
      () => this.loggedIn,
      (value) => {
        console.log('this.loggedIn: ', value);
      },
    );
  }

  setCurrentRoute = (state: NavigationState) => {
    runInAction(() => {
      const route = this.navService.getCurrentRoute(state);
      const routeChanged = route.key !== this.currentRoute.key;
      if (routeChanged) {
          console.log('routeName: ', route.name)
        this.currentRoute = route;
        this.history.unshift(route);
        if (this.history.length > 10) {
          this.history.pop();
        }
      }
    });
  };


 

  

}

let globalStore: GlobalStore | null = null;

if (globalStore === null) {
  globalStore = new GlobalStore();
}

export default globalStore as GlobalStore;