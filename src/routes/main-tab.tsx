import React from 'react';
import {withTheme} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer, inject} from 'mobx-react';
import {reaction, IReactionDisposer} from 'mobx';
import {StackNavigationProp} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import MainTabHomeScreen from '../screens/MainTabHome';
import MainTabSearchScreen from '../screens/MainTabSearch';
import MainTabLikesScreen from '../screens/MainTabLikes';
import MainTabMypageScreen from '../screens/MainTabMypage';

const MainTab = createBottomTabNavigator();

const MainTabAfterAuth = () => {
  return (
    <MainTab.Navigator screenOptions={{ headerShown: false}}>
      <MainTab.Screen
        name="MainTabHome"
        component={MainTabHomeScreen}
        options={{
          tabBarTestID: 'MainTabHome',
          tabBarLabel: 'Home',
        }}
      />

      <MainTab.Screen
        name="MainTabSearch"
        component={MainTabSearchScreen}
        options={{
          tabBarTestID: 'MainTabSearch',
          tabBarLabel: 'Search',
        }}
      />
      <MainTab.Screen
        name="MainTabLikes"
        component={MainTabLikesScreen}
        options={{
          tabBarTestID: 'MainTabLikes',
          tabBarLabel: 'Like',
        }}
      />
      <MainTab.Screen
        name="MainTabMypage"
        component={MainTabMypageScreen}
        options={{
          tabBarTestID: 'MainTabMypage',
          tabBarLabel: 'My',
        }}
      />
    
    </MainTab.Navigator>
  );
};

export default observer(MainTabAfterAuth);
