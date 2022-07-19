import React, {useEffect, useState} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {View, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';
import styled from 'styled-components/native';
import HeaderFilter from '../components/HeaderFilter';
import Footer from '../components/Footer';
import {Space} from '../Theme';
import EmptyList from './EmptyList';

import LoadingModal from '../components/LoadingModal';
const StoreList = (props: any) => {
  const {type, category} = props;
  const g = useGlobalStore();

  const onRefresh = () => {
    if (!g.refreshing) {
      g.getShopList();
    }
  };

  return (
    <View>
      <FlatList
        data={g.shopList.slice()}
        ListHeaderComponent={
          <>
            <HeaderFilter />
          </>
        }
        renderItem={({item, index}) => (
          <StoreListItem item={item} index={index} />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        onRefresh={onRefresh}
        refreshing={g.refreshing}
        columnWrapperStyle={{
          paddingHorizontal: 16,
        }}
        ListFooterComponent={
          <View style={{flex: 1}}>
            {g.shopList.slice().length === 0 && (
              <EmptyList
                text1="해당 카테고리에 등록된 매장이 없습니다."
                text2={`다른 카테고리를 선택 해주세요..`}
              />
            )}
            <Space />
            <Footer />
          </View>
        }
      />
    </View>
  );
};

export default observer(StoreList);
const Wrapper = styled.View`
  flex: 1;
  padding: 0 16px;
`;
// const EmptyList = styled.View<{ph0?: boolean}>`
//   padding: 40px 16px;
//   justify-self: center;
//   align-items: center;
// `;
