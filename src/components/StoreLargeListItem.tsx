import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ITEM_WIDTH = wp('100%') - 32;
const StoreLargeListItem = (props: any) => {
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
    </StoreItem>
  );
};

export default observer(StoreLargeListItem);

const StoreItem = styled.View<{type?: number}>`
  width: ${ITEM_WIDTH}px;
  margin-bottom: 16px;
`;

const SliderImg = styled.Image`
  width: 100%;
  height: ${ITEM_WIDTH}px;
  border-radius: 8px;
`;
const Badge = styled.View`
  position: absolute;
  bottom: 22px;
  right: 10px;
  width: 40px;
  height: 40px;
  background: #efb324;
  justify-content: center;
  align-items: center;
  border-radius: 60px;
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
