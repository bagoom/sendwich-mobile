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
import LoginScreen from '../screens/Login';
import RegisterFirstScreen from '../screens/RegisterFirst';
import RegisterSecondScreen from '../screens/RegisterSecond';
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
        {!store.authChecked
          ? this.renderCheckAuthScreen()
          : !store.loggedIn
          ? this.renderBeforeAuthScreens()
          : this.renderAfterAuthScreens()}

        {/* <MainStackStackNav.Screen
          name="RegisterSecondScreen"
          component={RegisterSecondScreen}
          options={{headerShown: false}}
        /> */}
      </MainStackStackNav.Navigator>
    );
  }

  renderCheckAuthScreen = () => {
    return (
      <>
        <MainStackStackNav.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
      </>
    );
  };

  renderBeforeAuthScreens = () => {
    return (
      <>
        <MainStackStackNav.Screen
          name="RegisterFirst"
          component={RegisterFirstScreen}
          options={{headerShown: false}}
        />
        <MainStackStackNav.Screen
          name="RegisterSecondScreen"
          component={RegisterSecondScreen}
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
      currentRouteName === '모임비지원' ||
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
