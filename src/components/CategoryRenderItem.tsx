import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, LayoutAnimation, Dimensions, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';

const numColumns = 3;
const CategoryRenderItem = ({item, index}: any) => {
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  const clearItem = (index + 1) % 3 === 0 ? true : false;
  const isSelected = g.selectedCategories
    .map((e: any) => e.id)
    .includes(item.id);
  if (item.empty === true) {
    return <EmptyItem clear={clearItem} />;
  }

  return (
    <ListItem
      clear={clearItem}
      activeOpacity={1}
      onPress={() => {
        g.storeFiltering(item.title);
        navigation.navigate('StoreFilterList');
      }}>
      <ListItemCover selected={isSelected}>
        {item.image && (
          <ListItemImg
            selected={isSelected}
            source={{
              uri: `${BASE_URL}${item.image.url}`,
            }}
            imageStyle={isSelected && {opacity: 0.55}}
            resizeMode="cover"
          />
        )}
        <TitleWrap>
          <Title>{item.title}</Title>
        </TitleWrap>
      </ListItemCover>
    </ListItem>
  );
};

export default observer(CategoryRenderItem);

const ListItem = styled.TouchableOpacity<{clear?: boolean}>`
  flex: 1;
  margin-bottom: 10px;
  margin-right: ${props => (props.clear ? '0' : '10')}px;
  height: ${(Dimensions.get('window').width - 42) / numColumns}px;
  border-radius: 8px;
  overflow: hidden;
`;

const ListItemCover = styled.View<{selected?: boolean}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  background: #000;
  border-width: ${props => (props.selected ? '4' : '0')}px;
  border-color: #ffbd2e;
`;
const ListItemImg = styled.ImageBackground<{selected?: boolean}>`
  flex: 1;
`;

const EmptyItem = styled.View<{clear?: boolean}>`
  flex: 1;
  margin-bottom: 10px;
  margin-right: ${props => (props.clear ? '0' : '10')}px;
  height: ${(Dimensions.get('window').width - 42) / numColumns}px;
`;

const TitleWrap = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: -0.1px;
  padding: 1.5px 0;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  align-items: center;
`;

const Title = styled.Text`
  color: #fff;
  font-size: 13px;
`;
