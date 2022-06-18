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

import {HOME_MENU} from '@env';
import MainTab from './main-tab';
import MainDrawer from './main-drawer';
import Login from '../screens/Login';
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
          cardStyle: {
            //   backgroundColor: this.props.theme.colors.defaultSurface,
          },
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
        {/* {!store.authChecked
          ? this.renderCheckAuthScreen()
          : store.loggedIn
          ? this.renderAfterAuthScreens()
          : this.renderBeforeAuthScreens()} */}

        {this.renderAfterAuthScreens()}

        <MainStackStackNav.Screen
          name="Login"
          component={Login}
          // options={{headerShown: false}}
        />
      </MainStackStackNav.Navigator>
    );
  }

  //   renderCheckAuthScreen = () => {
  //     return (
  //       <>
  //         <MainStackStackNav.Screen name="CheckAuth" component={CheckAuthScreen} />
  //       </>
  //     );
  //   };

  //   renderBeforeAuthScreens = () => {
  //     return (
  //       <>
  //         <MainStackStackNav.Screen name="BeforeAuth" component={BeforeAuthScreen} />
  //         <MainStackStackNav.Screen name="Login" component={LoginScreen} />
  //       </>
  //     );
  //   };

  renderAfterAuthScreens = () => {
    const {navigation} = this.props;
    const currentRouteName = this.props.store.currentRoute.name;
    return (
      <MainStackStackNav.Screen
        name="MainStack"
        component={MainTab}
        options={({route}) => ({
          headerLeft: () => currentRouteName === '메뉴1' && <MainDrawer />,
          headerTitle: () => (
            <HomeHeaderTitle
              navigation={navigation}
              currentRouteName={currentRouteName}
            />
          ),
          headerRight: () => <HomeHeaderRight />,
        })}
      />
    );
  };
}
export default withTheme(withGlobalStore(observer(MainStack)));
