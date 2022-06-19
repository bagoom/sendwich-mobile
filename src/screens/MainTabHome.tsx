import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import HomeSwiper from '../components/HomeSwiper';

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <>
      <HomeSwiper />
    </>
  );
};

export default observer(MainTabA1Screen);
