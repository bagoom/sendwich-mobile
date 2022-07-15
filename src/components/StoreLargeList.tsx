import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreLargeListItem from './StoreLargeListItem';

import {Title} from '../Theme';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import Loader from '../components/Loader';

let titleVisible = false;
const StoreLargeList = (props: any) => {
  const {navigation} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();

  const {isLoading, error, data} = useQuery('store-large-list', () =>
    axios(
      `${BASE_URL}/api/stores/with-coupon?populate=*&pagination[start]=0&pagination[limit]=3&sort=id:asc`,
    ),
  );
  return (
    <>
      {isLoading && <Loader />}

      {!isLoading && (
        <View
          style={{
            flex: 1,
            marginTop: 16,
            paddingBottom: 30,
          }}>
          {props.titleVisible && <Title>내 주변 매장</Title>}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}>
            {data?.data.data.map((item: any, key: any) => (
              <StoreLargeListItem item={item} key={key} />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default observer(StoreLargeList);
