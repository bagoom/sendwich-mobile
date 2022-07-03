import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {observer, inject} from 'mobx-react';
import {useGlobalStore} from '../store/util';
import CustomScreen from '../screens/CustomScreen';

const Tab = createMaterialTopTabNavigator();

const MainHeaderSubTab = () => {
  const g = useGlobalStore();
  const categories = g.dynamic_categories;
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        swipeEnabled: false,
        tabBarPressColor: 'transparent',
        tabBarIndicatorStyle: {
          backgroundColor: 'transparent',
        },
        tabBarInactiveTintColor: '#aaa',
        tabBarActiveTintColor: '#222',
        tabBarScrollEnabled: true,
        tabBarStyle: {
          borderBottomWidth: 1,
          borderBottomColor: '#f5f5f5',
          elevation: 0,
        },
        tabBarLabelStyle: {
          paddingHorizontal: 5,
          margin: 0,
        },
        tabBarItemStyle: {
          width: 'auto',
        },
      }}>
      {categories.map((router, index) => {
        return (
          <Tab.Screen
            name={router.title}
            key={index}
            component={CustomScreen}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default observer(MainHeaderSubTab);
