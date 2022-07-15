import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

const ITEM_WIDTH = wp('100%') - 32;
const StoreLargeListItem = (props: any) => {
  const {item} = props;
  const FIRST_ITEM = item.id % 2;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <StoreItem
      type={FIRST_ITEM}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('SotreDetail', item.id)}>
      <View>
        <Badge>
          <BadgeText>{item.coupon.discount_rate}%</BadgeText>
        </Badge>
        <SliderImg source={{uri: `${BASE_URL}${item?.main_image[0].url}`}} />
      </View>

      <Subject>{item.shop_name}</Subject>
      <Description>{item.coupon.name}</Description>
    </StoreItem>
  );
};

export default observer(StoreLargeListItem);

const StoreItem = styled.TouchableOpacity<{type?: number}>`
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
