import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ITEM_WIDTH = wp('100%') / 2 - 23;
const StoreListItem = (props: any) => {
  const {navigation, item} = props;
  const FIRST_ITEM = item.id % 2;
  const g = useGlobalStore();

  return (
    <StoreItem type={FIRST_ITEM}>
      <View>
        <Badge>
          <BadgeText>10%</BadgeText>
        </Badge>
        <SliderImg source={require('../assets/images/main_banner.jpeg')} />
      </View>

      <Subject>브라운도트</Subject>
      <Description>전주 떡갈비</Description>
      <Text1>학동역 도보로 5분</Text1>
      <Text1>320m</Text1>
    </StoreItem>
  );
};

export default observer(StoreListItem);

const StoreItem = styled.View<{type?: number}>`
  width: ${ITEM_WIDTH}px;
  margin-right: ${props => (props.type ? '14px' : '0px')};
  margin-bottom: 18px;
`;

const SliderImg = styled.Image`
  width: 100%;
  height: ${ITEM_WIDTH}px;
  border-radius: 8px;
`;
const Badge = styled.View`
  position: absolute;
  bottom: 12px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: #efb324;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
  border-width: 0.5px;
  border-color: rgba(0, 0, 0, 0.3);
  z-index: 2;
`;

const BadgeText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  letter-spacing: -0.2px;
  color: #000;
`;

const Subject = styled.Text`
  margin-top: 10px;
  font-size: 17px;
  font-weight: 500;
  color: #000;
`;
const Description = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #7e745c;
`;
const Text1 = styled.Text`
  font-size: 12px;
  font-weight: 500;
  color: #999;
  letter-spacing: -0.3px;
`;
