import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import {useNavigation} from '@react-navigation/native';
import styled from 'styled-components/native';

const DateListItem = (props: any) => {
  const {item} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <DateItem onPress={() => navigation.navigate('DateDetail')}>
      <CoverImg
        source={require('../assets/images/main_banner.jpeg')}
        resizeMode="cover"
      />

      <Subject>아트 인 메타버스</Subject>
      <Description>
        다양한 VR을 퀄리티 좋은 작품으로 만나볼 수 있는 곳, 메타버스를 온전히
        느낄 수 있는 언스탠드에비뉴 체험 전시회
      </Description>
    </DateItem>
  );
};

export default observer(DateListItem);

const DateItem = styled.TouchableOpacity<{type?: number}>`
  width: 100%;
  margin-bottom: 22px;
`;

const CoverImg = styled.Image`
  width: 100%;
  height: 110px;
  border-radius: 8px;
`;
const Subject = styled.Text`
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #000;
`;
const Description = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  line-height: 19px;
  color: #7e745c;
`;
