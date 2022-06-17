import React from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {observer} from 'mobx-react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';
import {createDrawerNavigator} from '@react-navigation/drawer';

import MainTab from './main-tab';

const MainStackStackNav = createStackNavigator();
const Drawer = createDrawerNavigator();

interface MainStackProp {
  store: GlobalStore;
}

class MainStack extends React.Component<MainStackProp> {
  constructor(props: MainStackProp) {
    super(props);
  }

  render() {
    const {store} = this.props;
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
    return (
      <MainStackStackNav.Screen
        name="MainStack2"
        component={MainTab}
        options={({route}) => ({
          headerShown: this.props.store.currentRoute.name !== '메뉴1',
          title: this.props.store.currentRoute.name,
        })}
      />
    );
  };
}
export default withGlobalStore(observer(MainStack));
