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
import LoginScreen from '../screens/Login';
import RegisterFirstScreen from '../screens/RegisterFirst';
import RegisterSecondScreen from '../screens/RegisterSecond';
import MainFoodBanner from '../screens/MainFoodBanner';
import MainSubBannerFilter from '../screens/MainSubBannerFilter';
import MainAllBanner from '../screens/MainAllBanner';
import SetCurrentLocation from '../screens/SetCurrentLocation';
import Notification from '../screens/Notification';

import HomeHeaderTitle from '../components/HomeHeaderTitle';
import HomeHeaderRight from '../components/HomeHeaderRight';

const MainStackStackNav = createStackNavigator();

interface MainStackProp {
  store: GlobalStore;
  navigation: any;
  theme: any;
}

const defaultHeaderStyle = {
  borderBottomColor: '#eee',
  borderBottomWidth: 1,
};
const defaultHeaderTextStyle = {
  fontSize: 18,
};

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

        <MainStackStackNav.Screen
          name="MainFoodBanner"
          component={MainFoodBanner}
          options={{
            headerTitle: '오늘 뭐 먹지?',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="MainSubBannerFilter"
          component={MainSubBannerFilter}
          options={{
            headerTitle: '필터검색',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="MainAllBanner"
          component={MainAllBanner}
          options={{
            headerTitle: '이벤트 전체보기',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="SetCurrentLocation"
          component={SetCurrentLocation}
          options={{
            headerTitle: '현재 위치 설정',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="Notification"
          component={Notification}
          options={{
            headerTitle: '알림함',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
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
            borderBottomWidth: 0.7,
            borderBottomColor: '#f5f5f5',
          },
          headerLeft: () => showRender && <MainDrawer />,
          headerTitle: () => (
            <HomeHeaderTitle
              showRender={showRender}
              navigation={navigation}
              currentRouteName={currentRouteName}
            />
          ),
          headerRight: () =>
            showRender && <HomeHeaderRight navigation={navigation} />,
        })}
      />
    );
  };
}
export default withTheme(withGlobalStore(observer(MainStack)));
