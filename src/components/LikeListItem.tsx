import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';

const LikeListItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <ListItem>
      <Img source={require('../assets/images/1.jpg')} resizeMode="cover" />

      <Info>
        <Subject>브라운도트</Subject>
        <Description>최고급 육질의 소고기</Description>
      </Info>
    </ListItem>
  );
};

export default observer(LikeListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const Img = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

const Info = styled.View`
  margin-left: 8px;
`;

const Subject = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #000;
`;
const Description = styled.Text`
  margin-top: 0px;
  font-size: 14px;
  font-weight: 500;
  color: #7e745c;
`;
