import React, {useEffect, useRef} from 'react';
import {toJS} from 'mobx';
import {observer} from 'mobx-react';
import {View, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import StoreListItem from '../components/StoreListItem';
import styled from 'styled-components/native';
import HeaderFilter from '../components/HeaderFilter';
import Footer from '../components/Footer';
import {Space} from '../Theme';

import LoadingModal from '../components/LoadingModal';
const StoreList = (props: any) => {
  const {start, type, category} = props;
  const g = useGlobalStore();

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
        columnWrapperStyle={{
          paddingHorizontal: 16,
        }}
        ListFooterComponent={
          <View style={{flex: 1}}>
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
const EmptyList = styled.View<{ph0?: boolean}>`
  padding: 40px 16px;
  justify-self: center;
  align-items: center;
`;
