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
  const {start, type, category} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  let api: any;
  api = axios(
    `${BASE_URL}/api/stores/distances?_start=${start}&_limit=${
      start + 3
    }&km=12&lat=${g.coords?.lat}&lng=${
      g.coords?.lng
    }&order=${type}&category=${category}`,
  );
  const queryName = `store-list-start-${type}-${start}-${g.coords?.lat}-${category}`;
  const {isLoading, error, data} = useQuery(queryName, () => api);
  const listData = data?.data.data;
  return (
    <>
      {isLoading && (
        <View style={{flex: 1}}>
          <Loader />
        </View>
      )}

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
            {listData?.map((item: any, key: any) => (
              <StoreLargeListItem item={item} key={key} />
            ))}
          </View>
        </View>
      )}
    </>
  );
};

export default observer(StoreLargeList);
