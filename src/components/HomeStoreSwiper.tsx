import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, TouchableOpacity, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import Carousel from 'react-native-reanimated-carousel';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {Title} from '../Theme';

const PAGE_WIDTH = wp('100%');
const IMG_HEIGHT = PAGE_WIDTH / 1.8;
const baseOptions = {
  vertical: false,
  width: PAGE_WIDTH / 1.8,
  height: PAGE_WIDTH - 120,
} as const;

const HomeStoreSwiper = (props: any) => {
  const {titleVisible = true} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();

  return (
    <>
      <View style={{flex: 1, paddingLeft: 16, paddingBottom: 30}}>
        {titleVisible && <Title>모임비 지원해 드릴게요</Title>}

        <Carousel
          {...baseOptions}
          style={{width: '100%'}}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          data={[1, 2, 3]}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={1}
              style={{flex: 1, marginRight: 13}}
              onPress={() => navigation.navigate('SotreDetail')}>
              <SliderImg
                source={require('../assets/images/main_banner.jpeg')}
              />

              <View style={{marginTop: 10, flexDirection: 'row'}}>
                <Category>30% 지원</Category>
                <Subject>브라운도트</Subject>
              </View>
              <Description>최고급 육질의 소고기</Description>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

export default observer(HomeStoreSwiper);
const Category = styled.Text`
  margin-right: 5px;
  font-size: 17px;
  font-weight: 800;
  color: #ffbd2e;
  letter-spacing: -0.3px;
`;
const Subject = styled.Text`
  font-size: 17px;
  font-weight: 500;
  color: #000;
`;
const Description = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: #7e745c;
`;

const SliderImg = styled.Image`
  width: 100%;
  height: ${IMG_HEIGHT}px;
  border-radius: 8px;
`;
