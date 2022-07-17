import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';
import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import Loader from '../components/Loader';

import {Title} from '../Theme';
import HeaderFilter from '../components/HeaderFilter';
import Footer from '../components/Footer';
import {Space} from '../Theme';
let titleVisible = false;
const StoreList = (props: any) => {
  const {start, type, category} = props;
  titleVisible = props.titleVisible;
  const g = useGlobalStore();
  let api: any;
  api = axios(
    `${BASE_URL}/api/stores/distances?_start=${start}&_limit=${
      start + 40
    }&km=12&lat=${g.coords?.lat}&lng=${
      g.coords?.lng
    }&order=popular&category=식당`,
  );
  const queryName = `store-list-start-${type}-${start}-${category}-${g.coords?.lat}`;
  const {isLoading, error, data} = useQuery(queryName, () => api);
  const listData = data?.data.data;
  return (
    <>
      <FlatList
        data={listData}
        ListHeaderComponent={
          <>
            <HeaderFilter />
          </>
        }
        renderItem={({item, index}) => (
          <StoreListItem item={item} index={index} />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{
          paddingHorizontal: 16,
        }}
        ListFooterComponent={
          <View style={{flex: 1}}>
            {isLoading && <Loader />}
            <Space />
            <Footer />
          </View>
        }
      />

      {/* {listData?.map((item: any, key: any) => (
              <StoreListItem
                item={item}
                key={item.id}
                index={key}
                isLoading={isLoading}
              />
            ))} */}
    </>
  );
};

export default observer(StoreList);
const Wrapper = styled.View`
  flex: 1;
  padding: 0 16px;
`;
const EmptyList = styled.View<{ph0?: boolean}>`
  padding: 40px 16px;
  justify-self: center;
  align-items: center;
`;
