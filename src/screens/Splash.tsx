import React, {useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import {ThemeContext} from 'styled-components';
import {useQuery} from 'react-query';

interface User {
  id: number;
  title: string;
  author: string;
  nickname: string;
}

const SplashScreen = () => {
  const g = useGlobalStore();
  const theme = useContext(ThemeContext);
  return (
    <View style={{padding: 60}}>
      <TouchableOpacity onPress={g.signInWithKakao}>
        <Text>로그인</Text>
      </TouchableOpacity>
      <Text>nickname : {g.profile.nickname}</Text>
    </View>
  );
};

export default observer(SplashScreen);
