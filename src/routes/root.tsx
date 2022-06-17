import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  getFocusedRouteNameFromRoute,
  NavigationContainerRef,
} from '@react-navigation/native';

import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {Platform, Alert} from 'react-native';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';
import {useGlobalStore} from '../store/util';

import DrawerNavigator from './main-drawer';
/* stacks */

const RootStackNav = createStackNavigator();
const Drawer = createDrawerNavigator();

interface RootProps {
  store: GlobalStore;
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  render() {
    const {store} = this.props;
    return (
      <SafeAreaProvider>
        <NavigationContainer
          ref={store.navigationRef}
          onStateChange={store.setCurrentRoute}>
          <RootStackNav.Navigator
            screenOptions={({route, navigation}) => ({
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: Platform.OS === 'ios' ? true : false,
              cardOverlayEnabled: true,
              headerStatusBarHeight:
                navigation
                  .getState()
                  .routes.findIndex(r => r.key === route.key) > 0
                  ? 0
                  : undefined,
              ...TransitionPresets.ModalPresentationIOS,
            })}>
            <RootStackNav.Screen name="Home" component={DrawerNavigator} />
          </RootStackNav.Navigator>

          {/* <RootStack /> */}
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default withGlobalStore(observer(Root));
