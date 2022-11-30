import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {observer, inject} from 'mobx-react';
import {mainTabRoutes} from './main-tab-routes';
import Icon from '../../Icon-font.js'; //import
import {useGlobalStore} from '../store/util';
import styled from 'styled-components';

const MainTab = createBottomTabNavigator();

const MainTabAfterAuth = () => {
  const g = useGlobalStore();
  const showRender =
    g.currentRoute.name === '검색' ||
    g.currentRoute.name === '즐겨찾기' ||
    g.currentRoute.name === '마이페이지';
  return (
    <>
      <MainTab.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerShown: false,
          tabBarHideOnKeyboard: false,
          headerStyle: {
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontSize: 16,
            textAlign: 'center',
          },
          tabBarInactiveTintColor: '#999',
          tabBarActiveTintColor: '#FFBD2E',
          tabBarStyle: {
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: '#eee',
            elevation: 0,
          },
          tabBarIconStyle: {
            marginBottom: 5,
          },
          tabBarLabelStyle: {
            paddingBottom: 5,
          },
        }}>
        
        {mainTabRoutes.map(route => (
          <MainTab.Screen
            key={`screen--${route.name}`}
            name={route.name}
            component={route.com}
            options={{
              headerShown: route.header,
              tabBarLabel: route.label,
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
    </>
  );
};

export default observer(MainTabAfterAuth);
