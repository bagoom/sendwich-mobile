import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import {commaTheNumbers} from '../lib/transfer';

const CouponListItem = (props: any) => {
  const {navigation, item, coupon} = props;
  const g = useGlobalStore();
  console.log(coupon);
  return (
    <>
      {coupon.name !== '' && (
        <>
          <Title style={{marginTop: 28, marginBottom: 16}}>
            모임비 지원 매장
          </Title>
          <CouponItem>
            <View style={{flex: 1}}>
              <Subject>{coupon?.name}</Subject>
              <Price>
                <Text style={{textDecorationLine: 'line-through'}}>
                  {commaTheNumbers(coupon?.prime_cost)}원
                </Text>{' '}
                →{' '}
                <Text style={{color: theme.color.brown}}>
                  {commaTheNumbers(coupon?.display_discount_cost)}원
                </Text>
              </Price>
            </View>

            <Button>
              <ButtonText>구매하기</ButtonText>
            </Button>
          </CouponItem>
        </>
      )}
    </>
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
