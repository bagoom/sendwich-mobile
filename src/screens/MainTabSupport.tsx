import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';

const MainTabSupport = () => {
  const g = useGlobalStore();
  return (
    <View style={{padding: 60}}>
      <View>
        <Text style={{color: '#000'}}>MainTabSearch11</Text>
      </View>
    </View>
  );
};

export default observer(MainTabSupport);
