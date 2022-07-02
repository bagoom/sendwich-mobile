import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer, inject} from 'mobx-react';
import {useGlobalStore} from '../store/util';
import CustomRoute from './custom-router';

const Tab = createMaterialTopTabNavigator();

const MainHeaderSubTab = () => {
  const g = useGlobalStore();
  const categories = g.dynamic_categories;
  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarInactiveTintColor: '#aaa',
        tabBarActiveTintColor: '#222',
        tabBarStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#f5f5f5',
          elevation: 0,
        },
      }}
      //@ts-ignore
      tabBarOptions={{
        scrollEnabled: true,
        tabStyle: {
          width: 'auto',
        },
        labelStyle: {paddingHorizontal: 5, margin: 0, border: 0},
      }}>
      {categories.map((router, index) => {
        return (
          <Tab.Screen name={router.title} key={index} component={CustomRoute} />
        );
      })}
    </Tab.Navigator>
  );
};

export default observer(MainHeaderSubTab);
