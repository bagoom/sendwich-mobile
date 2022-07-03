import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import {useNavigation} from '@react-navigation/native';

const DetailHeaderRight = (props: any) => {
  const navigation = useNavigation<any>();
  const g = useGlobalStore();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('SotreDetailInfo')}>
        <Icon
          name="info"
          style={{marginRight: 16, fontSize: 24, color: '#222'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default observer(DetailHeaderRight);
