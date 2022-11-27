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
import {useNavigation} from '@react-navigation/native';
import MainSubBannerFilterItem from '../components/MainSubBannerFilterItem';
import CurationCalendarFilter from '../components/CurationCalendarFilter';
import CurationTimeFilter from '../components/CurationTimeFilter';
import CurationSupportFilter from '../components/CurationSupportFilter';
import CurationPlaceFilter from '../components/CurationPlaceFilter';
import CurationMeetingFilter from '../components/CurationMeetingFilter';
import CurationMoodFilter from '../components/CurationMoodFilter';
import CurationParkingFilter from '../components/CurationParkingFilter';
import CurationKidsFilter from '../components/CurationKidsFilter';

import BottomFixedButton from '../components/base-ui/BottomFixedButton';
import SelectBox from '../components/base-ui/SelectBox';

const MainSubBannerFilter = (props: any) => {
  const g = useGlobalStore();
  const navigation = useNavigation<any>();

  useEffect(() => {
    g.clearCurationFilter();
  }, []);
  // console.log(g.curationFilterString);
  return (
    <>
      <ScrollView keyboardShouldPersistTaps="handled">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Wrapper>
            <Header>
              <HeaderTitle>원하시는 코스{'\n'}다 찾아 드립니다.</HeaderTitle>
            </Header>

            <FilterList>
              <CurationCalendarFilter name="날짜 선택" label="날짜" />
              <CurationTimeFilter name="시간 선택" label="시간" />
              <MainSubBannerFilterItem
                name="예산"
                type="number"
                fixLabel="원 이하"
                target="budget"
              />
              <MainSubBannerFilterItem
                name="인원"
                type="number"
                fixLabel="명 이하"
                target="personnel"
              />
              <MainSubBannerFilterItem
                name="메뉴명 입력"
                label="메뉴명"
                target="menuname"
              />

              <CurationSupportFilter
                name="모임비 지원 여부를 선택 해주세요"
                label="모임비지원"
              />
              <CurationPlaceFilter
                name="장소 항목을 선택 해주세요"
                label="장소"
              />
              <CurationMeetingFilter
                name="모임성격 항목을 선택 해주세요"
                label="모임성격"
              />
              <CurationMoodFilter
                name="분위기 항목을 선택 해주세요"
                label="분위기"
              />
              <CurationParkingFilter
                name="주차 가능 여부를 선택 해주세요"
                label="주차"
              />
              <CurationKidsFilter
                name="키즈 항목을 선택 해주세요"
                label="키즈"
                isBordered={false}
              />
            </FilterList>
            <BottomFixedButton
              onPress={() => {
                g.getCurationStoreList();
                navigation.navigate('StoreCurationList');
              }}
              activeState={true}
            />
            {/* <BottomFixedButton disabled={true} /> */}
          </Wrapper>
        </TouchableWithoutFeedback>
      </ScrollView>

      <SelectBox />
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
