import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import HomeSubSwiper from '../components/HomeSubSwiper';
import DateList from '../components/DateList';
import {Space} from '../Theme';
import Footer from '../components/Footer';

const MainTabDating = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrapper>
        <HomeSubSwiper />
        <DateList />
      </Wrapper>
      <Space />
      <Footer />
    </ScrollView>
  );
};

export default observer(MainTabDating);

const ScrollView = styled.ScrollView`
  flex: 1;
`;
const Wrapper = styled.View`
  padding: 16px;
`;
