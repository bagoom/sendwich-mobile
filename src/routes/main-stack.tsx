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
import {TransitionPresets} from '@react-navigation/stack';

import CheckAuthScreen from '../screens/CheckAuth';
import LoginScreen from '../screens/Login';
import RegisterFirstScreen from '../screens/RegisterFirst';
import RegisterSecondScreen from '../screens/RegisterSecond';
import MainFoodBanner from '../screens/MainFoodBanner';
import MainSubBannerFilter from '../screens/MainSubBannerFilter';
import MainAllBanner from '../screens/MainAllBanner';
import SetCurrentLocation from '../screens/SetCurrentLocation';
import SetCurrentMapLocation from '../screens/SetCurrentMapLocation';
import Notification from '../screens/Notification';
import SotreDetail from '../screens/StoreDetail';
import SotreDetailInfo from '../screens/SotreDetailInfo';
import StoreCartOption from '../screens/StoreCartOption';
import DateDetail from '../screens/DateDetail';
import Notice from '../screens/Notice';
import CustomerService from '../screens/CustomerService';
import Config from '../screens/Config';
import Withdrawal from '../screens/Withdrawal';
import StoreCartList from '../screens/StoreCartList';
import StoreFilterList from '../screens/StoreFilterList';
import StoreCurationList from '../screens/StoreCurationList';

import DetailHeaderRight from '../components/DetailHeaderRight';

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
          : store.nonMember
          ? this.renderEmptyAuthScreens()
          : this.renderAfterAuthScreens()}
      </MainStackStackNav.Navigator>
    );
  }

  renderCheckAuthScreen = () => {
    return (
      <>
        <MainStackStackNav.Screen
          name="CheckAuth"
          component={CheckAuthScreen}
          options={{headerShown: false}}
        />
      </>
    );
  };

  renderBeforeAuthScreens = () => {
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

  renderEmptyAuthScreens = () => {
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
    return (
      <>
        <MainStackStackNav.Screen
          name="MainStack"
          component={MainTab}
          options={({route}) => ({
            headerShown: false,
            headerStyle: {
              borderBottomWidth: 0.7,
              borderBottomColor: '#f5f5f5',
            },
          })}
        />

        <MainStackStackNav.Screen
          name="MainFoodBanner"
          component={MainFoodBanner}
          options={{
            headerTitle: '?????? ??? ???????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="MainSubBannerFilter"
          component={MainSubBannerFilter}
          options={{
            headerTitle: '????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="MainAllBanner"
          component={MainAllBanner}
          options={{
            headerTitle: '????????? ????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="SetCurrentLocation"
          component={SetCurrentLocation}
          options={{
            headerTitle: '?????? ?????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="SetCurrentMapLocation"
          component={SetCurrentMapLocation}
          options={{
            headerTitle: '???????????? ?????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="Notification"
          component={Notification}
          options={{
            headerTitle: '?????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="SotreDetail"
          component={SotreDetail}
          options={({route}) => ({
            headerTitle: '???????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
            headerRight: () => <DetailHeaderRight route={route} />,
          })}
        />
        <MainStackStackNav.Screen
          name="SotreDetailInfo"
          component={SotreDetailInfo}
          options={({route}) => ({
            headerTitle: '?????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          })}
        />
        <MainStackStackNav.Screen
          name="StoreCartOption"
          component={StoreCartOption}
          options={{
            headerTitle: '???????????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="StoreCartList"
          component={StoreCartList}
          options={{
            headerTitle: '???????????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="StoreCurationList"
          component={StoreCurationList}
          options={{
            headerTitle: '???????????? ?????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="StoreFilterList"
          component={StoreFilterList}
          options={{
            headerTitle: '?????? ??????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="DateDetail"
          component={DateDetail}
          options={{
            headerTitle: '?????? ??? ????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="Notice"
          component={Notice}
          options={{
            headerTitle: '????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="CustomerService"
          component={CustomerService}
          options={{
            headerTitle: '????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="Config"
          component={Config}
          options={{
            headerTitle: '????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
        <MainStackStackNav.Screen
          name="Withdrawal"
          component={Withdrawal}
          options={{
            headerTitle: '????????????',
            headerStyle: {...defaultHeaderStyle},
            headerTitleStyle: {...defaultHeaderTextStyle},
          }}
        />
      </>
    );
  };
}
export default withTheme(withGlobalStore(observer(MainStack)));
