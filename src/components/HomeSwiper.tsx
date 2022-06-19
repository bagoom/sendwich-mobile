import React, {Profiler} from 'react';
import {observer} from 'mobx-react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import {useGlobalStore} from '../store/util';
import Icon from '../../Icon-font.js';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const width = wp('100%');
const SliderImg = styled.Image`
  width: ${width}px;
  height: ${width}px;
`;

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

const HomeSwiper = (props: any) => {
  const {navigation} = props;
  const g = useGlobalStore();

  return (
    <>
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View style={styles.slide1}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
        <View style={styles.slide2}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
        <View style={styles.slide3}>
          <SliderImg
            source={{
              uri: 'https://source.unsplash.com/random/?food',
            }}
          />
        </View>
      </Swiper>
      <Button title="로그아웃" onPress={g.signOutWithKakao}></Button>
    </>
  );
};

export default observer(HomeSwiper);
