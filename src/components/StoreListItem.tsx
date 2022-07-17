import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {converMeter} from '../lib/transfer';

const ITEM_WIDTH = wp('100%') / 2 - 23;
const StoreListItem = (props: any) => {
  const {item, index} = props;
  const FIRST_ITEM = (index + 1) % 2;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  return (
    <View style={{flex: 1}}>
      {item && (
        <StoreItem
          activeOpacity={1}
          type={FIRST_ITEM}
          onPress={() => navigation.navigate('SotreDetail', item.id)}>
          <View>
            <Badge>
              <BadgeText>{item?.coupon?.discount_rate}%</BadgeText>
            </Badge>
            {item?.main_image ? (
              <SliderImg
                source={{uri: `${BASE_URL}${item?.main_image[0]?.url}`}}
              />
            ) : (
              <NoImg />
            )}
          </View>

          <Subject>{item?.shop_name}</Subject>
          <Description>{item?.coupon?.name}</Description>
          <Text1>{item?.location_information}</Text1>
          <Text1>{converMeter(item?.distance)}</Text1>
        </StoreItem>
      )}
    </View>
  );
};

export default observer(StoreListItem);

const StoreItem = styled.TouchableOpacity<{type?: number}>`
  width: ${ITEM_WIDTH}px;
  margin-left: ${props => (props.type ? '0px' : '8px')};
  margin-bottom: 18px;
`;

const SliderImg = styled.Image`
  width: 100%;
  height: ${ITEM_WIDTH}px;
  border-radius: 8px;
`;
const NoImg = styled.View`
  width: 100%;
  height: ${ITEM_WIDTH}px;
  border-radius: 8px;
  background: #f3f3f3;
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
