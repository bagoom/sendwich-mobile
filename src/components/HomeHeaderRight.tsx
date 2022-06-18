import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';

const HomeHeaderRight = () => {
  const g = useGlobalStore();

  return (
    <View style={{paddingRight: 14, flexDirection: 'row'}}>
      <Icon
        name="noti"
        // onPress={}
        style={{
          width: 20,
          height: 20,
          marginRight: 16,
          fontSize: 20,
          color: '#222',
        }}
      />
      <Icon
        name="cart"
        // onPress={}
        style={{
          width: 20,
          height: 20,
          fontSize: 20,
          color: '#222',
        }}
      />
    </View>
  );
};

export default observer(HomeHeaderRight);
