import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import theme from '../Theme';

const MyCouponListItem = (props: any) => {
  const {navigation, item} = props;
  const g = useGlobalStore();
  console.log(g.couponModalVisible);
  return (
    <ListItem onPress={() => g.toggleCouponModal(true)}>
      <CouponImg source={require('../assets/images/coupon.png')} />

      <Title>떡갈비 스테이크</Title>
      <Price>40% 할인지원</Price>
      <Date>2022.04.30까지</Date>

      <Button>
        <ButtonText>사용하기</ButtonText>
      </Button>
    </ListItem>
  );
};

export default observer(MyCouponListItem);

const ListItem = styled.TouchableOpacity`
  margin-bottom: 13px;
  padding: 20px 16px;
  border-width: 1px;
  border-color: #f1f1f1;
  border-radius: 10px;
  background: #fff;
  overflow: hidden;
  flex-direction: column;
  align-items: flex-start;
  /* elevation: 1 */
`;

const CouponImg = styled.Image`
  position: absolute;
  top: 23px;
  right: 23px;
  width: 42px;
  height: 34px;
  z-index: 1;
`;
const Title = styled.Text`
  /* margin-top: 13px; */
  color: #000;
  font-size: 19px;
  font-weight: 300;
  letter-spacing: -1px;
`;
const Price = styled.Text`
  color: #000;
  font-size: 19px;
  font-weight: bold;
  letter-spacing: -1px;
`;
const Date = styled.Text`
  margin-top: 10px;
  color: #999;
  font-size: 13px;
  font-weight: 300;
  letter-spacing: -0.5px;
`;
const Button = styled.View`
  position: absolute;
  right: 16px;
  bottom: 20px;
  padding: 5px 10px;
  background: ${theme.color.point};
  border-radius: 5px;
`;
const ButtonText = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  font-size: 13px;
  letter-spacing: -0.3px;
`;
