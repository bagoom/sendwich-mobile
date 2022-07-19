import React, {useState} from 'react';
import {observer} from 'mobx-react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useGlobalStore} from '../store/util';
import Swiper from 'react-native-web-swiper';

import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';

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

  return (
    <>
      <View style={styles.container}>
        <Swiper
          minDistanceToCapture={5}
          springConfig={{bounciness: 0}}
          minDistanceForAction={0.05}
          controlsProps={{
            dotsPos: 'bottom-left',
            prevPos: false,
            nextPos: false,
            dotActiveStyle: styles.dotActiveStyle,
            dotsWrapperStyle: styles.paginationWrapper,
          }}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainSubBannerFilter')}>
              <SliderImg
                source={require('../assets/images/main_sub_banner.jpeg')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainSubBannerFilter')}>
              <SliderImg
                source={require('../assets/images/main_sub_banner.jpeg')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate('MainSubBannerFilter')}>
              <SliderImg
                source={require('../assets/images/main_sub_banner.jpeg')}
              />
            </TouchableOpacity>
          </View>
        </Swiper>
      </View>
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
