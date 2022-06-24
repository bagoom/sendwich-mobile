import React from 'react';
import {
  StackActions,
  CommonActions,
  NavigationContainerRef,
  createNavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

//@ts-ignore
function getCurrentRoute(state: NavigationState) {
  const route = state.routes[state.index];
  if (route.state) {
    return getCurrentRoute(route.state);
  }
  return {
    key: route.key,
    name: route.name,
    stack: state.routes,
    index: state.index,
  };
}
export default (
  navigationRef: React.RefObject<
    NavigationContainerRef<ReactNavigation.RootParamList>
  >,
) => {
  return {
    navigate: (name: string, params?: any) => {
      navigationRef.current?.navigate(name, params);
    },
    //@ts-ignore
    replace: (...args) => {
      //@ts-ignore
      navigationRef.current?.dispatch(StackActions.replace(...args));
    },

    getCurrentRoute: getCurrentRoute,
  };
};
