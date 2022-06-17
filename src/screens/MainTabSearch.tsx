import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <View style={{padding: 60}}>
      <View>
        <Text>MainTabSearch11</Text>
      </View>
    </View>
  );
};

export default observer(MainTabA1Screen);