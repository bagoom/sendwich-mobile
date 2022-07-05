import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import {useNavigation} from '@react-navigation/native';

const HomeHeaderTitle = (props: any) => {
  const {currentRouteName, showRender} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return showRender ? (
    <TouchableOpacity
      style={{
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => {
        navigation.navigate('SetCurrentLocation');
      }}>
      <Text
        style={{
          marginRight: 3,
          color: '#222',
          fontSize: 14,
          fontWeight: '500',
        }}>
        {g.headerAddr ? g.headerAddr : '현재 위치를 설정 해주세요.'}
      </Text>
      <Icon
        name="arrow-down"
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
