import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import {useNavigation} from '@react-navigation/native';

const HomeHeaderRight = (props: any) => {
  const navigation = useNavigation<any>();
  const g = useGlobalStore();

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
        <Icon
          name="notification"
          // onPress={}
          style={{
            width: 20,
            height: 20,
            marginRight: 16,
            fontSize: 20,
            color: '#222',
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('StoreCartList')}>
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
      </TouchableOpacity>
    </View>
  );
};

export default observer(HomeHeaderRight);
