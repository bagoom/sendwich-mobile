import React from 'react';
import {observer} from 'mobx-react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import HomeSwiper from '../components/HomeSwiper';
import HomeSubSwiper from '../components/HomeSubSwiper';
import HomeIcons from '../components/HomeIcons';

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <ScrollView style={{flex: 1}}>
      <HomeSwiper />
      <Container>
        <HomeSubSwiper />

        <HomeIcons />
      </Container>
    </ScrollView>
  );
};

export default observer(MainTabA1Screen);

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background: red;
`;
