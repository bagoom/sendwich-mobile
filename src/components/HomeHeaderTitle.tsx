import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';

const HomeHeaderTitle = (props: any) => {
  const {navigation, currentRouteName} = props;
  const g = useGlobalStore();
  return currentRouteName === '메뉴1' ? (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('Login');
      }}>
      <Text
        style={{
          marginRight: 3,
          color: '#222',
          fontSize: 14,
          fontWeight: '500',
        }}>
        부산시 사하구 비봉로 93
      </Text>
      <Icon
        name="arrow"
        // onPress={}
        style={{
          fontSize: 14,
          color: '#222',
        }}
      />
    </TouchableOpacity>
  ) : (
    <Text style={{color: '#222', fontSize: 14, fontWeight: '500'}}>
      {g.currentRoute.name}
    </Text>
  );
};

export default observer(HomeHeaderTitle);
