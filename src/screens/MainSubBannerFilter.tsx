import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  View,
} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';

import MainSubBannerFilterItem from '../components/MainSubBannerFilterItem';
import BottomFixedButton from '../components/base-ui/BottomFixedButton';

const MainSubBannerFilter = (props: any) => {
  const g = useGlobalStore();
  return (
    <>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Wrapper>
            <Header>
              <HeaderTitle>원하시는 코스{'\n'}다 찾아 드립니다.</HeaderTitle>
            </Header>

            <FilterList>
              <MainSubBannerFilterItem name="날짜" />
              <MainSubBannerFilterItem name="시간" />
              <MainSubBannerFilterItem name="예산" />
              <MainSubBannerFilterItem name="인원" />
              <MainSubBannerFilterItem name="장소" />
              <MainSubBannerFilterItem name="모임성격" />
              <MainSubBannerFilterItem name="모임성격" />
              <MainSubBannerFilterItem name="모임성격" isBordered={false} />
            </FilterList>
            <BottomFixedButton />
          </Wrapper>
        </TouchableWithoutFeedback>
      </ScrollView>
    </>
  );
};

export default observer(MainSubBannerFilter);

const Wrapper = styled.View`
  flex: 1;
  padding: 30px 16px 50px;
`;
const Header = styled.View`
  margin-bottom: 35px;
`;
const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.1px;
  color: #000;
`;

const FilterList = styled.View`
  flex: 1;
`;
