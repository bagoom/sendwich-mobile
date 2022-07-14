import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';
import {useNavigation} from '@react-navigation/native';

import {commaTheNumbers} from '../lib/transfer';
import styled from 'styled-components/native';

const DetailMenuItem = (props: any) => {
  const {menu, index, shop_id} = props;
  const g = useGlobalStore();
  const firstItem = index == 0;
  const navigation = useNavigation<any>();
  return (
    <MenuItem
      withBorderTop={firstItem}
      onPress={() =>
        navigation.navigate('StoreCartOption', {
          shop_id: shop_id,
          menuname: menu.menuname,
          price: menu.price,
        })
      }>
      <Name>{menu.menuname}</Name>
      <Price>{commaTheNumbers(menu.price)}원</Price>
      {menu.menudesc !== '' && <Description>{menu.menudesc}</Description>}
    </MenuItem>
  );
};

export default observer(DetailMenuItem);

const MenuItem = styled.TouchableOpacity<{
  withBorderTop?: boolean;
}>`
  padding: 20px 22px;
  border-bottom-width: 0.7px;
  border-color: #eee;
`;

const Name = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: #000;
  letter-spacing: -0.3px;
`;

const Price = styled.Text`
  margin-top: 5px;
  font-size: 18px;
  font-weight: bold;
  color: #000;
  letter-spacing: -0.3px;
`;
const Description = styled.Text`
  margin-top: 5px;
  font-size: 14px;
  line-height: 19px;
  color: #999;
`;
