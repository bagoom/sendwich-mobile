import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer, inject} from 'mobx-react';
import HomeScreen from '../screens/MainTabHome';
import MainTabSupport from '../screens/MainTabSupport';
import MainTabDating from '../screens/MainTabDating';
import MainHeaderTabSupport from './main-header-tab-nested';
import HomeHeaderTitle from '../components/HomeHeaderTitle';
const MainHeaderTab = createMaterialTopTabNavigator();

const MainHeaderTabAfterAuth = () => {
  return (
    <MainHeaderTab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {
          backgroundColor: '#FFBD2E',
        },
        tabBarInactiveTintColor: '#222',
        tabBarActiveTintColor: '#EFA400',
        tabBarStyle: {
          paddingVertical: 3,
          borderBottomColor: '#f5f5f5',
          borderBottomWidth: 1,
          elevation: 0,
        },
      }}>
      <MainHeaderTab.Screen name="추천" component={HomeScreen} />
      <MainHeaderTab.Screen
        name="모임비지원"
        component={MainHeaderTabSupport}
      />
      <MainHeaderTab.Screen name="데이트코스" component={MainTabDating} />
    </MainHeaderTab.Navigator>
  );
};

export default observer(MainHeaderTabAfterAuth);
