import React from 'react';
import {observer} from 'mobx-react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import HomeHeaderSwiper from '../components/HomeHeaderSwiper';
import HomeSubSwiper from '../components/HomeSubSwiper';
import HomeIcons from '../components/HomeIcons';
import HomeStoreSwiper from '../components/HomeStoreSwiper';
import StoreList from '../components/StoreList';
import Footer from '../components/Footer';
import EmptyList from '../components/EmptyList';

import {Space, Title} from '../Theme';

import StoreListItem from '../components/StoreListItem';
import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';

const MainTabA1Screen = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  const api = axios(
    `${BASE_URL}/api/stores/distances?_start=0&_limit=8&km=12&lat=${g.coords?.lat}&lng=${g.coords?.lng}&order=distance&category=식당`,
  );
  const queryName = `store-list-start-distance-${g.coords?.lat}-home`;
  const {isLoading, error, data, isFetched} = useQuery(queryName, () => api, {
    staleTime: 0,
    retry: false,
  });
  const listData = data?.data.data;

  return (
    <SafeAreaView style={{flex: 1}}>
      {!isLoading && (
        <FlatList
          style={{flex: 1}}
          ListHeaderComponent={
            <>
              <HomeHeaderSwiper navigation={navigation} />
              <Container>
                <HomeSubSwiper />
                <HomeIcons navigation={navigation} />
              </Container>
              <HomeStoreSwiper />
              <Space />
              <ContainerType2>
                <Title>내 주변 매장</Title>
              </ContainerType2>
            </>
          }
          data={listData}
          renderItem={({item, index}) => (
            <StoreListItem item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{
            paddingHorizontal: 16,
          }}
          ListFooterComponent={
            <>
              {(listData?.length === 0 || !data) && (
                <EmptyList
                  text1="근처에 등록된 매장이 없습니다."
                  text2="현재 위치를 변경 해보세요."
                />
              )}
              <Space />
              <Footer />
            </>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default observer(MainTabA1Screen);

const Container = styled.View`
  flex: 1;
  padding: 16px;
`;
const ContainerType2 = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 0 16px;
`;
