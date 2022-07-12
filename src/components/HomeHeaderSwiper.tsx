import React, {useState, useRef} from 'react';
import axios from 'axios';
import {observer} from 'mobx-react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Swiper from 'react-native-web-swiper';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import styled from 'styled-components/native';
import Carousel from 'react-native-reanimated-carousel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const PAGE_WIDTH = wp('100%');
const IMG_HEIGHT = PAGE_WIDTH / 1.8;

const baseOptions = {
  vertical: false,
  width: PAGE_WIDTH,
  height: PAGE_WIDTH,
} as const;

const fetchBannerList = () => {
  return axios.get(`${BASE_URL}/api/banners?populate=*`);
};

const HomeHeaderSwiper = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  const [slideIdx, setIdx] = useState(0);

  const {isLoading, isError, data, error} = useQuery(
    'mian-header-banner',
    fetchBannerList,
    {
      refetchOnWindowFocus: false, // react-query는 사용자가 사용하는 윈도우가 다른 곳을 갔다가 다시 화면으로 돌아오면 이 함수를 재실행합니다. 그 재실행 여부 옵션 입니다.
      retry: 0, // 실패시 재호출 몇번 할지
      onSuccess: (data: any) => {
        // 성공시 호출
        // console.log(data.data.data);
      },
      onError: (e: any) => {
        // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
        // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
        console.log(e.message);
      },
    },
  );

  return (
    <>
      <View style={{height: PAGE_WIDTH}}>
        <Carousel
          {...baseOptions}
          style={{width: '100%'}}
          autoPlay={true}
          autoPlayInterval={2500}
          scrollAnimationDuration={800}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
          onScrollEnd={idx => setIdx(idx)}
          data={data?.data.data}
          renderItem={({item, index}: any) =>
            index == 0 ? (
              <TouchableOpacity
                activeOpacity={1}
                style={{flex: 1}}
                onPress={() => navigation.navigate('MainFoodBanner')}>
                <SliderImg source={{uri: `${BASE_URL}${item?.image.url}`}} />
              </TouchableOpacity>
            ) : (
              <SliderImg source={{uri: `${BASE_URL}${item?.image.url}`}} />
            )
          }
        />

        <Pagination
          activeOpacity={1}
          onPress={() => navigation.navigate('MainAllBanner')}>
          <PaginationText>
            {slideIdx + 1}/{data?.data.data.length} 전체보기
          </PaginationText>
        </Pagination>
      </View>
    </>
  );
};

export default observer(HomeHeaderSwiper);

const SliderImg = styled.Image`
  width: ${PAGE_WIDTH}px;
  height: ${PAGE_WIDTH}px;
`;

const Pagination = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  right: 15px;
  flex: 1;
  min-width: 86px;
  padding: 4px 13px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;
const PaginationText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  text-align: center;
`;
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
