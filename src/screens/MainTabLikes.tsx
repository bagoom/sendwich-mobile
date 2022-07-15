import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import LikeList from '../components/LikeList';
import RecentList from '../components/RecentList';

const MainTabA1Screen = () => {
  const g = useGlobalStore();
  return (
    <ScrollView>
      <Wrpper>
        <Title>최근 구경한 장소</Title>
        <RecentList />

        <Container>
          <Title>내가 찜한 장소</Title>
          <LikeList />
        </Container>
      </Wrpper>
    </ScrollView>
  );
};

export default observer(MainTabA1Screen);
const Wrpper = styled.View`
  padding: 16px 0;
  margin-bottom: 30px;
`;
const ScrollView = styled.ScrollView`
  padding: 0 16px;
`;

const Container = styled.View`
  margin-top: 30px;
`;
