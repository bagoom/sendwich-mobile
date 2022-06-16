import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  NavigationContainerRef,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {Platform, Alert} from 'react-native';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';

import MainStack from './main-stack';
/* stacks */

const RootStackNav = createStackNavigator();

interface RootProps {
  store: GlobalStore;
}

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  render() {
      const { store } = this.props;
    return (
      <SafeAreaProvider>
        <NavigationContainer
          ref={store.navigationRef}
          onStateChange={store.setCurrentRoute}
        >
          <RootStackNav.Navigator
            screenOptions={({route, navigation}) => ({
              presentation: 'modal',
              headerShown: false,
              gestureEnabled: Platform.OS === 'ios' ? true : false,
              cardOverlayEnabled: true,
              headerStatusBarHeight:
                navigation.getState().routes.findIndex((r) => r.key === route.key) > 0
                  ? 0
                  : undefined,
              ...TransitionPresets.ModalPresentationIOS,
            })}>
            <RootStackNav.Screen
              name="Main"
              component={MainStack}
              // options={{headerShown: false}}
            />
          </RootStackNav.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

export default withGlobalStore(observer(Root));