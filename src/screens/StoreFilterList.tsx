import React, {useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, Text, FlatList} from 'react-native';
import {useGlobalStore} from '../store/util';
import styled from 'styled-components/native';
import theme, {Title} from '../Theme';
import Icon from '../../Icon-font.js';

import FilteredStoreListItem from '../components/FilteredStoreListItem';

const StoreFilterList = () => {
  const g = useGlobalStore();

  useEffect(() => {
    return () => {
      g.clearFilteredShopList();
      g.getPopularKeywordList();
    };
  }, []);
  return (
    <>
      {g.filteredShopList.length === 0 && (
        <EmptyList>
          <Icon
            name="info"
            style={{fontSize: 42, color: '#999', marginBottom: 13}}
          />
          <Text1>찾으시는 검색어에 대한 결과가 없습니다. </Text1>
          <Text1>다른 검색어로 검색 해보세요. </Text1>
        </EmptyList>
      )}
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

const EmptyList = styled.View`
  padding: 50px 20px;
  justify-content: center;
  align-items: center;
`;
const Text1 = styled.Text`
  margin-bottom: 3px;
  font-size: 14px;
  color: #999;
`;
