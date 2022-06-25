import React, {useEffect, useState} from 'react';
import {useGlobalStore} from '../store/util';
import {observer} from 'mobx-react';
import styled from 'styled-components/native';
import {
  Dimensions,
  FlatList,
  LayoutAnimation,
  StyleSheet,
  View,
  Button,
} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';
import {RegisterContainer} from '../Theme';
import Icon from '../../Icon-font.js';

const BASE_URL = 'http://localhost:1337';
const numColumns = 3;

const formatData = (data: any, numColumns: number, selectedCategories: any) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);
  let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;

  while (
    numberOfElementsLastRow !== numColumns &&
    numberOfElementsLastRow !== 0
  ) {
    data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
    numberOfElementsLastRow++;
  }
  return data;
};

const RegisterSecond = (props: any) => {
  const g = useGlobalStore();

  useEffect(() => {
    g.getCategories();
  }, []);

  var CustomAnimation = {
    duration: 400,
    create: {
      type: LayoutAnimation.Types.spring,
      property: LayoutAnimation.Properties.scaleXY,
      springDamping: 0.7,
    },
    update: {
      type: LayoutAnimation.Types.spring,
      springDamping: 1,
    },
  };
  const nextStep = g.selectedCategories.length >= 5;
  const toggleFirstBox = () => {
    LayoutAnimation.configureNext(CustomAnimation);
  };

  const renderItem = ({item, index}: any) => {
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
          toggleFirstBox();
          g.selectCategory(item);
        }}>
        {isSelected && (
          <Badge>
            <Icon
              name="check"
              style={{
                fontSize: 5,
                color: '#fff',
              }}
            />
          </Badge>
        )}
        <ListItemCover selected={isSelected}>
          <ListItemImg
            selected={isSelected}
            source={{
              uri: `${BASE_URL}${item.attributes?.image.data[0].attributes.url}`,
            }}
            imageStyle={isSelected && {opacity: 0.55}}
            resizeMode="cover"
          />
        </ListItemCover>
      </ListItem>
    );
  };

  return (
    <RegisterContainer>
      <Wrapper>
        <Header>
          <HeaderTitle>
            가고 싶거나 먹고 싶은 사진을{'\n'}
            다섯개 이상 눌러주세요
          </HeaderTitle>
        </Header>

        <FlatList
          data={formatData(g.categories, numColumns, g.selectedCategories)}
          renderItem={renderItem}
          numColumns={numColumns}
        />

        <FixedBtnContainer>
          <FixedBtn
            activeNextStack={nextStep}
            disabled={!nextStep}
            onPress={g.signUp}>
            <FixedBtnText activeNextStack={nextStep}>가입완료</FixedBtnText>
          </FixedBtn>
        </FixedBtnContainer>
      </Wrapper>
    </RegisterContainer>
  );
};

export default observer(RegisterSecond);

const Wrapper = styled.View`
  flex: 1;
  padding: 30px 16px;
`;
const Header = styled.View`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #000;
`;
const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: -0.1px;
`;

const ListItem = styled.TouchableOpacity<{clear?: boolean}>`
  flex: 1;
  margin-bottom: 10px;
  margin-right: ${props => (props.clear ? '0' : '10')}px;
  height: ${(Dimensions.get('window').width - 42) / numColumns}px;
  border-radius: 5px;
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

const Badge = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  background: #ffbd2e;
  justify-content: center;
  align-items: center;
  z-index: 1;
  border-radius: 7px;
`;

const EmptyItem = styled.View<{clear?: boolean}>`
  flex: 1;
  margin-bottom: 10px;
  margin-right: ${props => (props.clear ? '0' : '10')}px;
  height: ${(Dimensions.get('window').width - 42) / numColumns}px;
`;
const FixedBtnContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
`;

const FixedBtn = styled.TouchableOpacity<{activeNextStack?: boolean}>`
  width: 100%;
  height: 100%;
  background: ${props => (props.activeNextStack ? '#FFBD2E' : '#ccc')};
  justify-content: center;
  align-items: center;
`;
const FixedBtnText = styled.Text<{activeNextStack?: boolean}>`
  color: ${props => (props.activeNextStack ? '#000' : '#fff')};
  font-size: 14px;
  font-weight: 500;
`;
