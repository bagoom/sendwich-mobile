import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, TouchableOpacity, Alert} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import Icon from '../../Icon-font.js';
import {useNavigation} from '@react-navigation/native';
import {BASE_URL} from '@env';
import {commaTheNumbers} from '../lib/transfer';
import axios from 'axios';
import {useMutation, useQuery, useQueryClient} from 'react-query';

const CartListItem = (props: any) => {
  const {item} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const onPressHandel = () => {
    Alert.alert(
      `${item.shop_name}를 장바구니 목록에서\n삭제하시겠습니까?`,
      '',
      [
        {
          text: '취소',
          onPress: () => {},
          style: 'cancel',
        },
        {text: '삭제', onPress: () => mutateDelete.mutate()},
      ],
    );
  };
  const mutateDelete = useMutation(
    () => axios.delete(`${BASE_URL}/api/carts/${item.id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('fetch-list-fetch');
      },
    },
  );
  return (
    <ListItem
      activeOpacity={1}
      onPress={() => navigation.navigate('SotreDetail', item.shop_id)}>
      <View style={{flexDirection: 'row'}}>
        <ImgBox>
          <Corver source={{uri: `${BASE_URL}${item?.cover_img}`}} />
        </ImgBox>
        <View style={{paddingVertical: 5, paddingRight: 0}}>
          <Subject>{item.shop_name}</Subject>
          <MenuName>
            {item.menu_name} <Count>x {item.count}</Count>
          </MenuName>
          <Price>{commaTheNumbers(item.price)}원</Price>
        </View>
      </View>

      <TouchableOpacity
        onPress={onPressHandel}
        style={{transform: [{rotate: '-180deg'}], padding: 5}}>
        <Icon
          name="close"
          style={{
            fontSize: 14,
            color: '#d5d5d5',
          }}
        />
      </TouchableOpacity>
    </ListItem>
  );
};

export default observer(CartListItem);

const ListItem = styled.TouchableOpacity<{type?: number}>`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-bottom-width: 0.6px;
  border-color: #f3f3f3;
`;

const ImgBox = styled.View`
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border-radius: 4px;
  overflow: hidden;
  border: 0.7px solid #eee;
`;
const Corver = styled.Image`
  width: 80px;
  height: 80px;
`;

const Subject = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: #000;
  letter-spacing: -0.3px;
`;
const MenuName = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #999;
`;
const Count = styled.Text`
  font-size: 14px;
  line-height: 22px;
  color: #444;
`;
const Price = styled.Text`
  margin-top: 2px;
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  color: #444;
`;
