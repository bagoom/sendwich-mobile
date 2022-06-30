import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, Text, LayoutAnimation, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {formatData} from '../lib/convert-data-to-columns';
import CategoryRenderItem from '../components/CategoryRenderItem';
import StoreListItem from '../components/StoreListItem';

const numColumns = 3;
const MainFoodBanner = (props: any) => {
  const g = useGlobalStore();

  useEffect(() => {
    g.getCategories();
  }, []);

  return (
    <Wrapper>
      <Header>
        <HeaderTitle>
          먹고 싶은 음식을{'\n'}
          눌러주세요.
        </HeaderTitle>
      </Header>

      <FlatList
        data={formatData(g.categories, numColumns, g.selectedCategories)}
        renderItem={({item, index}: any) => (
          <CategoryRenderItem item={item} index={index} />
        )}
        numColumns={numColumns}
      />
    </Wrapper>
  );
};

export default observer(MainFoodBanner);

const Wrapper = styled.View`
  flex: 1;
  padding: 30px 16px;
`;
const Header = styled.View`
  margin-bottom: 25px;
`;
const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.1px;
  color: #000;
`;
