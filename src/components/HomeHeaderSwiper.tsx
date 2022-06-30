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

const width = wp('100%');

const styles = StyleSheet.create({
  container: {
    height: width,
  },
});

const HomeHeaderSwiper = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();
  return (
    <>
      <View style={styles.container}>
        <Swiper
          minDistanceToCapture={5}
          springConfig={{bounciness: 0}}
          minDistanceForAction={0.05}
          controlsProps={{
            dotsPos: 'bottom-right',
            prevPos: false,
            nextPos: false,
            DotComponent: ({index, activeIndex, isActive, onPress}) => (
              <Pagination>
                <PaginationText>
                  {activeIndex + 1}/{index + 1} 전체보기
                </PaginationText>
              </Pagination>
            ),
          }}>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('MainFoodBanner')}>
              <SliderImg
                source={require('../assets/images/main_banner.jpeg')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <SliderImg
              source={{
                uri: 'https://source.unsplash.com/random/?food',
              }}
            />
          </View>
          <View>
            <SliderImg
              source={{
                uri: 'https://source.unsplash.com/random/?food',
              }}
            />
          </View>
        </Swiper>
      </View>
    </>
  );
};

export default observer(HomeHeaderSwiper);

const SliderImg = styled.Image`
  width: ${width}px;
  height: ${width}px;
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
