import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer, inject} from 'mobx-react';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeScreen from '../screens/MainTabHome';
import MainTabDating from '../screens/MainTabDating';
import MainHeaderTabSupport from './main-header-tab-nested';
import CustomTopTabHeader from '../components/CustomTopTabHeader';
const MainHeaderTab = createMaterialTopTabNavigator();

const MainHeaderTabAfterAuth = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomTopTabHeader />
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
            paddingVertical: 0,
            borderBottomColor: '#f5f5f5',
            // borderBottomWidth: 1,
            elevation: 0.8,
          },
        }}>
        <MainHeaderTab.Screen name="추천" component={HomeScreen} />
        <MainHeaderTab.Screen
          name="모임비지원"
          component={MainHeaderTabSupport}
        />
        <MainHeaderTab.Screen name="데이트코스" component={MainTabDating} />
      </MainHeaderTab.Navigator>
    </SafeAreaView>
  );
};

export default observer(MainHeaderTabAfterAuth);
