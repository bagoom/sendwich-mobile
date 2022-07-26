import React, {useLayoutEffect} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useGlobalStore} from '../store/util';
import Swiper from 'react-native-web-swiper';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import {useQuery} from 'react-query';
import {BASE_URL} from '@env';
import moment from 'moment';

const width = wp('100%');

const styles = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 10,
    overflow: 'hidden',
  },
  paginationWrapper: {
    bottom: 25,
  },
  dotActiveStyle: {
    backgroundColor: '#7D331A',
  },
});

const HomeSubSwiper = (props: any) => {
  const {} = props;
  const g = useGlobalStore();
  const navigation = useNavigation<any>();
  const fetchBannerList = () => {
    return axios.get(
      `${BASE_URL}/api/banners?populate=*&filters[position][$eq][0]=큐레이션배너&filters[end_date][$gte][1]=${moment(
        new Date(),
      ).format('yy-MM-DD')}`,
    );
  };

  const {isLoading, isError, data, error} = useQuery(
    'main-curation-banner',
    fetchBannerList,
  );
  const banner = data?.data.data;

  useLayoutEffect(() => {}, [data]);
  return (
    <>
      {!isLoading && (
        <View style={styles.container}>
          <Swiper
            minDistanceToCapture={5}
            springConfig={{bounciness: 0}}
            minDistanceForAction={0.05}
            loop={true}
            timeout={3.5}
            controlsProps={{
              dotsPos: 'bottom-left',
              prevPos: false,
              nextPos: false,
              dotActiveStyle: styles.dotActiveStyle,
              dotsWrapperStyle: styles.paginationWrapper,
            }}>
            {banner?.map((item: any, index: any) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('MainSubBannerFilter')}>
                    <SliderImg
                      source={{uri: `${BASE_URL}${item?.image.url}`}}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Swiper>
        </View>
      )}
    </>
  );
};

export default observer(HomeSubSwiper);

const SliderImg = styled.Image`
  width: 100%;
  height: 100%;
`;

const Pagination = styled.View`
  position: absolute;
  bottom: 0;
  right: 0;
  flex: 1;
  min-width: 86px;
  padding: 4px 13px;
  border-radius: 20px;
  border-width: 1px;
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;
`;
const PaginationText = styled.Text`
  font-size: 10px;
  font-weight: 500;
  color: #fff;
  text-align: center;
`;
