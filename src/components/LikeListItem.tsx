import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const LikeListItem = (props: any) => {
  const {item} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();

  return (
    <ListItem onPress={() => navigation.navigate('SotreDetail', item.shop_id)}>
      <Img source={{uri: `${BASE_URL}${item?.cover_img}`}} />
      <Info>
        <Subject>{item?.shop_name}</Subject>
        <Description>{item?.coupon_name}</Description>
      </Info>
    </ListItem>
  );
};

export default observer(LikeListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom-width: 0.7px;
  border-color: #eee;
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
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.3px;
  color: #000;
`;
const Description = styled.Text`
  margin-top: 0px;
  font-size: 14px;
  color: #999;
`;
