import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer, inject} from 'mobx-react';
import {mainTabRoutes} from './main-tab-routes';
import Icon from '../../Icon-font.js'; //import
import styled from 'styled-components';

const MainTab = createBottomTabNavigator();

const MainTabAfterAuth = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#999',
        tabBarActiveTintColor: '#FFBD2E',
        tabBarStyle: {
          height: 60,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#eee',
          elevation: 0,
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          paddingBottom: 10,
        },
      }}>
      {mainTabRoutes.map(route => (
        <MainTab.Screen
          key={`screen--${route.name}`}
          name={route.name}
          component={route.com}
          options={{
            tabBarIcon: ({focused}) => {
              return (
                <Icon
                  name={route.icon}
                  style={{
                    width: 20,
                    height: 20,
                    fontSize: 20,
                    color: focused ? '#FFBD2E' : '#999',
                  }}
                />
              );
            },
          }}
        />
      ))}
    </MainTab.Navigator>
  );
};

export default observer(MainTabAfterAuth);
