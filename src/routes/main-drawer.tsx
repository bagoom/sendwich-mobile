import React from 'react';
import {observer, inject} from 'mobx-react';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, TouchableOpacity, Alert} from 'react-native';

import {useGlobalStore} from '../store/util';
import MainStack from './main-stack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const g = useGlobalStore();
  return (
    <Drawer.Navigator detachInactiveScreens={false}>
      <Drawer.Screen
        name="Feed2"
        component={MainStack}
        options={{
          headerShown: g.currentRoute.name === 'MainTabHome',
          headerTitle: () => (
            <TouchableOpacity onPress={() => Alert.alert('This is a button!')}>
              <Text style={{color: '#222'}}>부산시 사하구 비봉로 93</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default observer(DrawerNavigator);
