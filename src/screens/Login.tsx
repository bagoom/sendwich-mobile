import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import {ThemeContext} from 'styled-components';

const LoginScreen = () => {
  const g = useGlobalStore();
  const theme = useContext(ThemeContext);

  return (
    <View style={{padding: 60}}>
      <TouchableOpacity>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
