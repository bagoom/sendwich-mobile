import React, {ReactChild, useEffect} from 'react';
import {observer} from 'mobx-react';
import {View, FlatList, ScrollView, Dimensions} from 'react-native';
import {useGlobalStore} from '../store/util';

import styled from 'styled-components/native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from '../../Icon-font.js';
import {Space} from '../Theme';
import RecentAddressList from '../components/RecentAddressList';

const WrapperWidth = wp('100%') - 32;

const SetCurrentLocation = (props: any) => {
  const g = useGlobalStore();

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <Container>
          <InputRow>
            <TextInput
              placeholder="건물명, 도로명 또는 지번으로 검색"
              placeholderTextColor={'#aaa'}
            />
            <SearchButton>
              <Icon name="search" style={{fontSize: 20, color: '#222'}} />
            </SearchButton>
          </InputRow>

          <LocationButton>
            <Icon name="target" style={{fontSize: 20, color: '#222'}} />
            <Text>현 위치로 주소 설정</Text>
          </LocationButton>
        </Container>
        <Space />

        <Container>
          <RecentAddressList />
        </Container>
      </ScrollView>
    </>
  );
};

export default observer(SetCurrentLocation);

const Container = styled.View`
  padding: 18px 16px;
`;

const InputRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const TextInput = styled.TextInput`
  width: ${WrapperWidth - 55}px;
  height: 50px;
  padding: 0 16px;
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 3px;
  font-size: 14px;
  color: #000;
`;

const SearchButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 3px;
`;

const LocationButton = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  margin: 10px 0;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #e5e5e5;
  border-radius: 3px;
`;

const Text = styled.Text`
  margin-left: 3px;
  font-size: 14px;
  color: #000;
`;