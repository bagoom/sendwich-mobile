import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import theme from '../Theme';

const CouponListItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();

  return (
    <CouponItem>
      <View style={{flex: 1}}>
        <Subject>떡갈비 스테이크 40% 할인지원</Subject>
        <Price>
          <Text style={{textDecorationLine: 'line-through'}}>23,000원</Text> →{' '}
          <Text style={{color: theme.color.brown}}>13,800원</Text>
        </Price>
      </View>

      <Button>
        <ButtonText>구매하기</ButtonText>
      </Button>
    </CouponItem>
  );
};

export default observer(CouponListItem);

const CouponItem = styled.View<{type?: number}>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: 70px;
  padding: 20px;
  background: #fff9ec;
  border-width: 1px;
  border-color: ${theme.color.point};
  border-radius: 10px;
`;

const Subject = styled.Text`
  font-size: 14px;
  color: #695c3b;
  line-height: 18px;
  letter-spacing: -0.3px;
`;
const Price = styled.Text`
  font-size: 17px;
  font-weight: bold;
  color: #7e745c;
  letter-spacing: -0.3px;
`;
const Button = styled.TouchableOpacity`
  padding: 8px 14px;
  background: ${theme.color.point};
  border-radius: 24px;
  justify-content: center;
`;
const ButtonText = styled.Text`
  font-size: 13px;
  color: #fff;
`;
