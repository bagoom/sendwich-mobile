import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {observer} from 'mobx-react';
import {Platform, Alert} from 'react-native';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';
import {ThemeProvider} from 'styled-components';
import {QueryClientProvider, QueryClient} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

import Theme from '../Theme';

import MainStack from './main-stack';

const queryClient = new QueryClient();

/* stacks */
const RootStackNav = createStackNavigator();

interface RootProps {
  store: GlobalStore;
}

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: Theme.color.white,
  },
};

class Root extends React.Component<RootProps> {
  constructor(props: RootProps) {
    super(props);
  }

  render() {
    const {store} = this.props;
    store.getUserAuth();
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={Theme}>
          <SafeAreaProvider>
            <NavigationContainer
              ref={store.navigationRef}
              theme={navTheme}
              //@ts-ignore
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
                      .routes.findIndex((r: any) => r.key === route.key) > 0
                      ? 0
                      : undefined,
                  ...TransitionPresets.ModalPresentationIOS,
                })}>
                <RootStackNav.Screen name="Home" component={MainStack} />
              </RootStackNav.Navigator>
            </NavigationContainer>
            <ReactQueryDevtools initialIsOpen={true} position="top-right" />
          </SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  }
}

export default withGlobalStore(observer(Root));
