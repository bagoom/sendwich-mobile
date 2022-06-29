import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer, inject} from 'mobx-react';
import Icon from '../../Icon-font.js'; //import
import HomeScreen from '../screens/MainTabHome';
import MainTabSearch from '../screens/MainTabSearch';

const MainHeaderTab = createMaterialTopTabNavigator();

const MainHeaderTabAfterAuth = () => {
  return (
    <MainHeaderTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarIndicatorStyle: {
          backgroundColor: '#FFBD2E',
        },
        tabBarInactiveTintColor: '#222',
        tabBarActiveTintColor: '#EFA400',
        // tabBarStyle: {
        //   paddingVertical: 3,
        //   borderTopWidth: 1,
        //   borderTopColor: '#eee',
        // },
      }}>
      <MainHeaderTab.Screen name="추천" component={HomeScreen} />
      <MainHeaderTab.Screen name="모임비지원" component={MainTabSearch} />
      <MainHeaderTab.Screen name="데이트코스" component={MainTabSearch} />
    </MainHeaderTab.Navigator>
  );
};

export default observer(MainHeaderTabAfterAuth);
