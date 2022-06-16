import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';

const LoginScreen = () => {
  const g = useGlobalStore();
  return (
    <View style={{padding: 60}}>
      <TouchableOpacity >
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
