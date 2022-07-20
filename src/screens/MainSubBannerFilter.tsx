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
import CurationCalendarFilter from '../components/CurationCalendarFilter';
import CurationTimeFilter from '../components/CurationTimeFilter';
import CurationPlaceFilter from '../components/CurationPlaceFilter';
import CurationMoodFilter from '../components/CurationMoodFilter';

import BottomFixedButton from '../components/base-ui/BottomFixedButton';

const MainSubBannerFilter = (props: any) => {
  const g = useGlobalStore();
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Wrapper>
            <Header>
              <HeaderTitle>원하시는 코스{'\n'}다 찾아 드립니다.</HeaderTitle>
            </Header>

            <FilterList>
              <CurationCalendarFilter name="날짜" />
              <CurationTimeFilter name="시간" />
              <MainSubBannerFilterItem
                name="예산"
                type="number"
                fixLabel="원 이하"
              />
              <MainSubBannerFilterItem
                name="인원"
                type="number"
                fixLabel="명 이하"
              />
              <MainSubBannerFilterItem name="메뉴명 입력" />
              <CurationPlaceFilter
                name="장소 항목을 선택 해주세요"
                label="장소"
              />
              <CurationPlaceFilter
                name="모임성격 항목을 선택 해주세요"
                label="모임성격"
              />
              <CurationMoodFilter
                name="분위기 항목을 선택 해주세요"
                label="분위기"
              />
              <CurationPlaceFilter
                name="주차 가능 여부를 선택 해주세요"
                label="주차"
              />
              <CurationPlaceFilter
                name="키즈 항목을 선택 해주세요"
                label="키즈"
                isBordered={false}
              />
            </FilterList>
            <BottomFixedButton disabled={true} />
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
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.1px;
  color: #000;
`;

const FilterList = styled.View`
  flex: 1;
`;
