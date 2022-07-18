import React from 'react';
import {observer} from 'mobx-react';
import {View, Text, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';

import FilteredStoreListItem from '../components/FilteredStoreListItem';

const StoreFilterList = () => {
  const g = useGlobalStore();
  return (
    <>
      <FlatList
        data={g.filteredShopList.slice()}
        renderItem={({item, index}) => (
          <FilteredStoreListItem item={item} index={index} />
        )}
        keyExtractor={(item: any) => item.id}
        numColumns={1}
      />
    </>
  );
};

export default observer(StoreFilterList);
const Wrpper = styled.View`
  margin-bottom: 30px;
`;
const ScrollView = styled.ScrollView``;
