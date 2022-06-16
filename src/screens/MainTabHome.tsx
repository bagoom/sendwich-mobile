import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <View style={{padding: 60}}>
      <View>
        <Text>MainTabHome</Text>
      </View>
    </View>
  );
};

export default observer(MainTabA1Screen);
