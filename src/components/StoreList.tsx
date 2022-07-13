import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';
import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';

import {Title} from '../Theme';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
let titleVisible = false;
const StoreList = (props: any) => {
  const {navigation} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  const {isLoading, error, data} = useQuery('home-store-swiper', () =>
    axios(`${BASE_URL}/api/stores/with-coupon?populate=*`),
  );

  const listData = data?.data.data;
  return (
    <>
      <View
        style={{
          flex: 1,
          marginTop: 30,
          paddingBottom: 30,
        }}>
        {props.titleVisible && <Title>내 주변 매장</Title>}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          {listData?.map((item: any, key: any) => (
            <StoreListItem item={item} key={item.id} index={key} />
          ))}
        </View>
      </View>
    </>
  );
};

export default observer(StoreList);
