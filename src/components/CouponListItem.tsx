import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, Text, Platform} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import {commaTheNumbers2} from '../lib/transfer';
import {useShoppingState} from '../hooks/useIap';

const CouponListItem = (props: any) => {
  const {navigation, item, coupon} = props;
  const g = useGlobalStore();
  const Iap = useShoppingState();

  

  // 구매
  const onPurchase = (item: any) => {
    if (item.type === 'subs') {
      Iap.requestSubscriptionPurchase(item.productId);
    } else {
      Iap.requestItemPurchase(item.productId);
    }
  }

  return (
    <>
      {coupon?.name !== '' && (
        <>
          <Title style={{marginTop: 28, marginBottom: 16}}>
            모임비 지원 매장
          </Title>
          <CouponItem>
            <View style={{flex: 1}}>
              <Subject>{coupon?.name}</Subject>
              <Price>
                <Text style={{textDecorationLine: 'line-through'}}>
                  {commaTheNumbers2(
                    coupon?.prime_cost ? coupon?.prime_cost : '',
                  )}
                  원
                </Text>{' '}
                →{' '}
                <Text style={{color: theme.color.brown}}>
                  {commaTheNumbers2(
                    coupon?.display_discount_cost
                      ? coupon?.display_discount_cost
                      : '',
                  )}
                  원
                </Text>
              </Price>
            </View>

            <Button onPress={()=> onPurchase({ 
              type : 'skus',
              productId : Platform.OS === 'android' ? 'com.meeting01' : 'com.sendwich.meeting01'
            })}>
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
