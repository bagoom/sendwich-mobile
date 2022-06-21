import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';
import {withTheme} from 'styled-components';

import MainTab from './main-tab';
import MainDrawer from './main-drawer';
import HomeScreen from '../screens/MainTabHome';
import SplashScreen from '../screens/Login';
import Icon from '../../Icon-font.js';
import HomeHeaderTitle from '../components/HomeHeaderTitle';
import HomeHeaderRight from '../components/HomeHeaderRight';

const MainStackStackNav = createStackNavigator();

interface MainStackProp {
  store: GlobalStore;
  navigation: any;
  theme: any;
}

class MainStack extends React.Component<MainStackProp> {
  constructor(props: MainStackProp) {
    super(props);
  }

  render() {
    const {store, theme} = this.props;
    return (
      <MainStackStackNav.Navigator
        initialRouteName="MainStack"
        screenOptions={{
          // cardStyle: {
          //   backgroundColor: 'red',
          // },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            padding: 10,
            // fontFamily: 'SpoqaHanSansNeo-Regular',
            //   fontSize: this.props.theme.dimensions.fs4,
            fontWeight: '400',
            //   color: this.props.theme.colors.defaultText,
          },
          headerStyle: {
            borderWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}>
        {!store.loggedIn && !store.profile.nickname
          ? this.renderBeforeAuthScreens()
          : this.renderAfterAuthScreens()}
      </MainStackStackNav.Navigator>
    );
  }

  renderBeforeAuthScreens = () => {
    return (
      <>
        <MainStackStackNav.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </>
    );
  };

  renderAfterAuthScreens = () => {
    const {navigation} = this.props;
    const currentRouteName = this.props.store.currentRoute.name;
    const showRender =
      currentRouteName === '추천' ||
      currentRouteName === '외식비지원' ||
      currentRouteName === '데이트코스';
    return (
      <MainStackStackNav.Screen
        name="MainStack"
        component={MainTab}
        options={({route}) => ({
          headerStyle: {
            // borderBottomWidth: 0.1,
          },
          headerLeft: () => showRender && <MainDrawer />,
          headerTitle: () => (
            <HomeHeaderTitle
              showRender={showRender}
              navigation={navigation}
              currentRouteName={currentRouteName}
            />
          ),
          headerRight: () => showRender && <HomeHeaderRight />,
        })}
      />
    );
  };
}
export default withTheme(withGlobalStore(observer(MainStack)));
