import React from 'react';
import {observer} from 'mobx-react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {withGlobalStore} from '../store/util';
import {GlobalStore} from '../store/store';

import MainTab from './main-tab';

const MainStackStackNav = createStackNavigator();

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
        screenOptions={{
          cardStyle: {
            //   backgroundColor: this.props.theme.colors.defaultSurface,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleAlign: store.currentRoute.name === 'MainTabHome'? 'left' : 'center',
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
      <>
        <MainStackStackNav.Screen name="MainStack" component={MainTab} options={({ route }) => ({ title: this.props.store.currentRoute.name })} />
      </>
    );
  };
}
export default withGlobalStore(observer(MainStack));
